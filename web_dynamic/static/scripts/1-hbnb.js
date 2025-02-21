$(document).ready(function () {
    $('li input[type="checkbox"]').on('change', function () {
	const dict_amenity = {};
	if ($(this).is(':checked')) {
//	    const dict_amenity = {};
	    key = $('amenity_id').val();
	    value = $('amenity_name').val();
	    dict_amenity[key] = value;
	} else {
	    dict_amenity.remove();
		}
	});
    $('.amenities h4').append(dict_amenity);	    
});
