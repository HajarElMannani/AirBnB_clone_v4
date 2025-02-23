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
        if (data.status === "OK") {
        $('#api_status').addClass('available');
        } else {
        $('#api_status').removeClass('available');
        }
    });
    function filterAmenities(filter) {
    $.ajax(
        {url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(filter),
            success: function (response) {
                $('.places').empty();
                for (let place of response) {
                    let article = `<article>
                        <div class="title_box"> 
                          <h2 class="place_name">${place.name}</h2>
                          <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                        <div class="information">
                          <div class="max_guest">${place.max_guest}</div>
                              <div class="number_rooms">${place.number_rooms}</div>
                              <div class="number_bathrooms">${place.number_bathrooms}</div>
                        </div>
                      <div class="description">${place.description}</div>
                      </article>`;
                      $('.places').append(article);
                    }
                }
    });
    }
    filterAmenities ({});
    $('button').click(function () {
        filterAmenities ({amenities: Object.keys(dict_amenity)});
    });
});
