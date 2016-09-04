
var fullscreen = (function(){
	var $items = $('.main .main_ul .pages'),
		$itemcounts = $items.length,
		
		$navNext = $('.navNext'),
		$navPrev = $('.navPrev'),
		
		current = 0,
		slideShowTime = 500,
		isHover = false,

		newImg,
		changeImg = $('.page2 .changediv .changeImg'),
		hasOldImg = false,
		oldImg,
		imgTimeout,
		wordIndex = 0,
		mark = $('.changediv .mark');
	// 初始化方法
	function init(config){
		initAnimate();
		initEvent();
		imgWall();
	}

	function imgWall(){
		var images = $('.beta_do img');

		images.hover(function() {
			isHover = true;
			newImg = $(this);
			clearTimeout(imgTimeout);
			// 不是第一次hover，且这次hover的图片和前一次不同
			if(hasOldImg && (oldImg == undefined || newImg.attr('src')!==oldImg.attr('src'))){
				changeImg.animate({
					'opacity': 0,
					},
					500, function() {
						changeBigImg();
				});
			// 第一次hover
			}else if(!hasOldImg){
				hasOldImg = true;
				changeImg.animate({
					'opacity': 0,
					},
					500, function() {
						changeBigImg();
				});
			// 在同一张图片上hover
			}else{
				changeBigImg();
			}
			oldImg = $(this);
		}, function() {
			clearTimeout(imgTimeout);
			imgTimeout = setTimeout('fadeOutImg()',3000);
		});

		// 更换page2右侧大图片以及下方说明文字
		function changeBigImg(){
			changeImg.attr({"src": newImg.attr("src")});
			changeImg.css({"display": 'block'});
			changeImg.animate({
				'opacity': 1,
				},
				500, function() {
			});
			// 增加图片下方的说明文字
			mark.text(newImg.attr('data'));
			mark.addClass('animated fadeInUp');
			mark.removeClass('fadeOutDown');
		}
	}
	// page2页面初始动画
	function initAnimate(){
		var title = $('.betahouse_name'),
			logo = $('.logo'),
			$links = $('.chaining'),
			$about = $('.about_us'),
			navLink = {
				zhizhi: $links.children('li').eq(0),
				recruit: $links.children('li').eq(1),
				about: $about.children('li').eq(0),
				email:$about.children('li').eq(1)
			}


	
		title.addClass('animated zoomInDown');
		$navNext.addClass('animated fadeInRight');
		$navPrev.addClass('animated fadeInLeft');
		logo.addClass('animated zoomIn');
		setTimeout(function(){
			navLink.zhizhi.addClass('animated bounceInLeft');
			navLink.recruit.addClass('animated bounceInLeft');
			navLink.about.addClass('animated bounceInRight');
			navLink.email.addClass('animated bounceInRight');

		},600);
		
	}
	// page2绑定事件
	function initEvent(){
		$navPrev.on('click', function(event) {
			navigate('prev');
		});
		$navNext.on('click', function(event) {
			navigate('next');
		});
	}
	// 切换屏幕内容
	function navigate(describe){
		var $oldItem = $items.eq(current),
			img_li = $('.page2 .beta_do li'),
			words = $('.changediv em'),
			wordlength = words.length;
		switch(describe){
			case 'prev':
			current = current==0 ? current = $itemcounts-1 : --current;
			break;
			case 'next':
			current = current==$itemcounts-1 ? current = 0 : ++current;
			break;
		}
		var $newItem = $items.eq(current);
		$oldItem.css({
			'opacity': 0,
			'z-index':-1
		});
		$newItem.css({
			'opacity': 1,
			'z-index': 2
		});
		changeImg.animate({'opacity':0}, 500,function(){
			changeImg.css('display', 'none');
		});
		if(current===1){
			img_li.addClass('animated bounceInRight');
			wordfall(wordIndex);
		}
	}
	return { init : init };

})();
// 左侧图片一段时间后消失
function fadeOutImg(){
	$('.changeImg').animate({'opacity':0}, 500,function(){
		$(this).css('display', 'none');
	});

	$('.changediv .mark').addClass('fadeOutDown').removeClass('fadeInUp');
}
//page2 字体掉落效果
function wordfall(wordIndex){
	var words = $('.changediv em');
	words.eq(wordIndex).css('opacity', '1');
	words.eq(wordIndex).addClass('animated worddown');
	wordIndex++;
	if(wordIndex < words.length){
		setTimeout('wordfall('+wordIndex+')',300);
	}
}
