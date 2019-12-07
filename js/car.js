$(function(){
    getSum()
    $('.checkall').change(function () { 
        //方式一
    //  let ischecked = $(this).prop('checked')
    //   if (ischecked) {
    //     $('.j-checkbox').prop('checked',true);
    //   } else {
    //     $('.j-checkbox').prop('checked',false);
    //   }
        //方式二
        $('.j-checkbox,.checkall').prop('checked',$(this).prop('checked'));
        if($(this).prop('checked') === true){
            $('.cart-item').addClass('check-cart-item');
        }else{
            $('.cart-item').removeClass('check-cart-item');
        }
    });

    // 如果小的复选框都被选中，设置大的为选中状态
    $('.j-checkbox').change(function () { 
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked',true)
        } else {
            $('.checkall').prop('checked',false)
        }

        if($(this).prop('checked') === true){
           $(this).parents('.cart-item').addClass('check-cart-item');
        }else{
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    });
    // 实现商品计数功能 增加并实现计价改变
    $('.increment').click(
        function(){
            let n = $(this).siblings('.itxt').val()
            n++;
            $(this).siblings('.itxt').val(n)

            // 计价改变
            let price =  $(this).parent().parent().siblings('.p-price').text().substr(1)
            // var aa =  $(this).parent().parent().siblings('.p-num').html(price * n)
            $(this).parent().parent().siblings('.p-sum').text("$" + (price * n).toFixed(2))

            getSum()
            
        }
    )
        // 实现商品计数功能 减少并实现计价改变
        $('.decrement').click(
            function(){
                let n = $(this).siblings('.itxt').val()
                if (n<1) {
                    return false;
                } else {
                    n--
                }
                
                
                $(this).siblings('.itxt').val(n)

                // 计价改变
                let price =  $(this).parent().parent().siblings('.p-price').text().substr(1)
                // var aa =  $(this).parent().parent().siblings('.p-num').html(price * n)
                $(this).parent().parent().siblings('.p-sum').text("$" + (price * n).toFixed(2))
                getSum()
            }
        )
        // 用户修改文本框的值，计算小计模块
            $('.itxt').change(function () { 
                var n =  $(this).val()
                console.log(n)
                
                var price = $(this).parents('.p-num').siblings('.p-price').text().substr(1)
                console.log(price)
                $(this).parents('.p-num').siblings('.p-sum') .text("$" + (price* n).toFixed(2))
                getSum()
            });
        // 实现购物车总计和总额模块
        function getSum(){
            var count = 0
            var money = 0
            $('.itxt').each(function(number, Element){
                count += parseInt( $(Element).val())
                $( '.amount-sum em').text(count)
            })
            $('.p-sum').each(function(i,ele){
                money += parseFloat( $(ele).text().substr(1))
                $('.price-sum em').text( "$"+ money.toFixed(2))
            })
        }
        // 删除按钮实现
        $('.p-action a').click(function(){
            $(this).parents('.cart-item').remove();
            getSum()
        })
        // 删除选中的商品实现
        $('.remove-batch').click(function(){
            console.log($('.j-checkbox:checked'))
            $('.j-checkbox:checked').parents('.cart-item').remove()
            getSum()
        })
        // 清理购物车
        $('.clear-all').click(function(){
            $('.cart-item').remove()
            getSum()
        })
})