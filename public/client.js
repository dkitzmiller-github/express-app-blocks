$(function () {

    const appendToList = (blocks) => {
        let list = [];
        for (let i = 0; i < blocks.length; i++) {
            let content = `<a href="/blocks/${blocks[i]}">${blocks[i]}</a>` +
                `<a href="#" data-block="${blocks[i]}"><img src="delete.jpg"></a>`;
            list.push($('<li>', {html: content}));
        }
        $('.block-list').append(list);
    };

    $('.block-list').on('click', 'a[data-block]', function(event) {
        if (!confirm('Are you sure?')) {
            return false;
        }

        let target = $(event.currentTarget);
        $.ajax({
            type: 'DELETE',
            url: `/blocks/${target.data('block')}`
        }).done(function() {
            target.parents('li').remove();
        });
    });

    $.get('/blocks', appendToList);


    $('form').on('submit', function (event) {
        event.preventDefault();
        let form = $(this);
        let blockData = form.serialize();

        $.ajax({
            type: 'POST',
            url: '/blocks',
            data: blockData
        }).done(function (blockName) {
            appendToList([blockName]);
            form.trigger('reset');
        });
    });

});
