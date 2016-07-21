var fullscreen = (function(){
	var $items = $('.main .main_ul .pages'),
		$itemcounts = $items.length,
		
		$navNext = $('.navNext'),
		$navPrev = $('.navPrev'),
		
		current = 0,
		slideShowTime = 500,
		isHover = false,

		newImg,
		hasOldImg = false,
		imgTimeout;

	function init(config){
		initAnimate();
		initEvent();
		imgWall();
	}

	function imgWall(){
		var images = $('.beta_do img'),
			changeImg = $('.changeImg');

		images.hover(function() {
			isHover = true;
			newImg = $(this);
			if(hasOldImg){
				changeImg.animate({
					'opacity': 0,
					},
					500, function() {
					changeBigImg();
				});
			}else{
				hasOldImg = true;
				changeBigImg();
			}
		}, function() {
			/*clearTimeout(imgTimeout);
			if(!isHover){
				imgTimeout = setTimeout(function(){
					changeImg.animate({
						'opacity': 0,
						},
						300, function() {
							
					});
				},700);
			}else{
				isHover = false;
			}*/
			
			
		});

		function changeBigImg(){
			changeImg.attr({
				"src": newImg.attr("src")
			});
			changeImg.css({
				"display": 'block'
			});
			changeImg.animate({
				'opacity': 1,
				},
				500, function() {
					
			});
		}	
	}




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

	function initEvent(){
		$navPrev.on('click', function(event) {
			navigate('prev');
		});
		$navNext.on('click', function(event) {
			navigate('next');
		});


	}

	function navigate(describe){
		var $oldItem = $items.eq(current);

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
	}
	return { init : init };

})();