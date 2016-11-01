'use strict';

$(function() {
    
    var $menuCategory = $('.menu-category'),
        $menuCategoryContainer = $('.menu-category-container'),
        $menuCategoryList,
        $menuContentContainer = $('.menu-content-container'),
        $menuContent,
        $menuContentList,
        $adds,
        $subs,
        offsetY = [],
        orderList = {
            'today': {
                title: '今日特价',
                totalCount: 0,
                totalPrice: 0,
                sort: 0,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            'hotsale': {
                title: '热销菜品',
                totalCount: 0,
                totalPrice: 0,
                sort: 1,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            'hot': {
                title: '精品热菜',
                totalCount: 0,
                totalPrice: 0,
                sort: 2,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            'cool': {
                title: '精品凉菜',
                totalCount: 0,
                totalPrice: 0,
                sort: 3,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            'food': {
                title: '特色主食',
                totalCount: 0,
                totalPrice: 0,
                sort: 4,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            'drink': {
                title: '酒水饮料',
                totalCount: 0,
                totalPrice: 0,
                sort: 5,
                list: {
                    'hsr': {
                        title: '红烧肉',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'szt': {
                        title: '肉沫酸豆角',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'fqjd': {
                        title: '西红柿鸡蛋',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                    'hsdf': {
                        title: '红烧豆腐',
                        discrib: '',
                        saleCount: 13,
                        rate: 95,
                        imgUrl: '/images/hsr_fqjd.jpeg',
                        singlePrice: 10,
                        totalPrice: 0,
                        count: 0
                    },
                }
            },
            totalPrice: 0,
            allTotalCount: 0
        };

    function renderHTML(container, tempID, data) {
        var menuHTML = template(tempID, {data: data});
        container.html(menuHTML);
    }
    function init() {
        $menuCategoryList = $menuCategoryContainer.find('li');
        $menuContent = $menuContentContainer.find('.menu-content');
        $menuContentList = $menuContent.children('li');
        $adds = $menuContent.find('.add');
        $subs = $menuContent.find('.sub');

        for(var i = 0 , len = $menuContentList.length; i < len; i++) {
            offsetY.push($menuContentList[i].offsetTop);
        }
    }
    function add_sub(that, sign) {
        var $this = $(that),
            $span = $this.siblings('span'),
            $sub = sign == 'add' ? $this.siblings('.sub') : $this;
            
        
        var count, totalPrice,
            categoryName = $this.parents('[data-category]').data('category'),
            dishName = $this.parents('[data-dish]').data('dish'),
            categoryObj = orderList[categoryName];
        
        calcCount(sign, categoryObj, dishName, $span, $sub);
        calcTotaoPrice($this, categoryName,dishName, categoryObj);
        renderTotalPrice();
        renderCategroyCount(categoryName, categoryObj);
    }
    function calcCount(sign, categoryObj, dishName, $span, $sub) {
        var count;

        count = sign == 'add' ? ++categoryObj.list[dishName].count : --categoryObj.list[dishName].count;

        $span.html(count);
        if(count >= 1) {
            $span.removeClass('hide');
            $sub.removeClass('hide');
        }
        if(count <= 0) {
            $span.addClass('hide');
            $sub.addClass('hide');
        }
        if(sign == 'add') {
            orderList.allTotalCount++;
            categoryObj.totalCount++;
        }
        if(sign == 'sub') {
            orderList.allTotalCount--;
            categoryObj.totalCount--;
        }
    }
    function calcTotaoPrice($this,categoryName,dishName, categoryObj) {
        var totalPrice;

        categoryObj.list[dishName].totalPrice = (categoryObj.list[dishName].count * categoryObj.list[dishName].singlePrice).toFixed(2);
        totalPrice = 0;
        for(var key in categoryObj.list) {
            if(categoryObj.list[key].totalPrice) {
                totalPrice += parseFloat(categoryObj.list[key].totalPrice, 10);
            }
        }
        categoryObj.totalPrice = totalPrice.toFixed(2);
        totalPrice = 0;
        for(var key in orderList) {
            if(orderList[key].totalPrice) {
                totalPrice += parseFloat(orderList[key].totalPrice, 10);
            }
        }
        orderList.totalPrice = totalPrice.toFixed(2);
        console.log(orderList.totalPrice);
    }
    function renderTotalPrice() {
        var $totalCharge = $('.total-charge strong'),
            $cart = $totalCharge.parents('.total-charge').siblings('.cart'),
            totalPrice = orderList.totalPrice;
        
        $totalCharge.html(totalPrice);
        totalPrice > 0 ? $cart.addClass('current') : $cart.removeClass('current');
    }
    function renderCategroyCount(categoryName, categoryObj) {
        var index = orderList[categoryName].sort,
            totalCount = orderList[categoryName].totalCount,
            $span = $menuCategoryList.eq(index).children('span');

        $span.html(totalCount);
        totalCount > 0 ? $span.removeClass('hide') : $span.addClass('hide');
    }
    function registerScrollEvent() {
        $menuContentContainer.off().on('scroll', function() {
            var $this = $(this),
                scrollY = $this.scrollTop();

            for(var i = 0 , len = offsetY.length; i < len; i++) {
                if(scrollY >= offsetY[i]) {
                    $menuCategoryList.removeClass('current');
                    $menuCategoryList.eq(i).addClass('current');
                }
            } 
        });
    }
    
    renderHTML($menuContentContainer, "menuContentTemplate", orderList);
    renderHTML($menuCategoryContainer, 'menuListTemplate', orderList);
    init();

    $menuCategoryList.on('click', function(event) {
        event.preventDefault();

        var $this = $(this), 
            index = $this.data('index'), 
            targetY = $menuContentList[index].offsetTop;

        $menuCategoryList.removeClass('current');
        $this.addClass('current');

        $menuContentContainer.off();
        $menuContentContainer.scrollTo({
            endY: targetY,
            duration: 1000
        });
    });
    $menuContent.on('tap, swipe', function() {
        registerScrollEvent();
    });
    registerScrollEvent();

    $adds.on('click', function(event) {
        event.preventDefault();

        add_sub(this, 'add');
    });
    $subs.on('click', function(event) {
        event.preventDefault();

        add_sub(this, 'sub');
    })
});