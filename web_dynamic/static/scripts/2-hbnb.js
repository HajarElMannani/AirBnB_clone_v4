/*{ $ }*/
$(document).ready(function () {
  const dict_amenity = {};
  $('li input[type="checkbox"]').on('change', function () {	
	if ($(this).is(':checked')) {
	    dict_amenity[$(this).attr('data-id')] = $(this).attr('data-name');
	} else {
	    delete dict_amenity[$(this).attr('data-id')];
		}
	let list_a = []
	list_a = Object.values(dict_amenity);
    let amenities = list_a.join(', ').slice(0, 30);
	let etc;
	if (amenities.length === list_a.join(', ').length) {
		 etc = '';
	} else { 
		etc = '...';
	}
	$('.amenities h4').text(amenities + etc );
  });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	if (status === 'OK') {
	    $('#api_status').addClass('available');
	} else {
	    $('#api_status').removeClass('available');
	}
	});
});
