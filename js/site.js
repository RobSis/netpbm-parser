(function () {	
	
	var landingZone = document.getElementById ('landing-zone'),
		imageList = document.getElementById ('image-list'),
		holder = document.getElementById ('holder');
	

	landingZone.ondragover = function (e) {
		e.preventDefault ();
		return false;	
	};

	
	landingZone.ondrop = function (e) {
		e.preventDefault ();
		
		var outstanding = 0,
			checkOutstanding = function () {
				if (!outstanding) $(landingZone).removeClass ('busy');
			};
			
		$(landingZone).addClass ('busy');
		
		
		for (var i = 0, l = e.dataTransfer.files.length; i < l; i++) {
			outstanding++;
			
			var file = e.dataTransfer.files[i],
				reader = new FileReader();
	
			reader.onload = function (event) {
				var data = event.target.result,
					img;
					
				try {
                    var canvas = NetPBM.load (data);
                    addImage (canvas);

				} catch (e) {
					alert (e.message);
				}
			
				outstanding--;
				checkOutstanding ();
			};
		
			reader.readAsBinaryString (file);
		}
				
		return false;
	};

	function addImage (img) {
		
		var height = img.height,
			width = img.width,
			png = Canvas2Image.saveAsPNG(img.getCanvas (), true);

		$(png).height (0).css ({
			left: '-25px'
		}).animate ({
			top: (-height / 2) + 'px',
			left: '25px',
			height: height + 'px'
		}); 
		
		var $li = $('<li>').append (png).prependTo (imageList);

		var holderHeight = height + 50;
		if ($(holder).height () < holderHeight) $(holder).animate ({ height: holderHeight + 'px' });

		var listWidth = $(imageList).width () + width + 25;
		$(imageList).width (listWidth);

		$('<span>').css ({paddingLeft:0}).appendTo ($li).animate ({ paddingLeft: width + 'px' });
	}

	
})();
