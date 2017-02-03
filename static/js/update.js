$(document).ready(function() {


    $("#intimepicker").timepicker();
    $("#outtimepicker").timepicker();

    var vehicals = [{"key":"TRUCK"},
		    {"key": "SUV"},
		    {"key":"CAR"},
		    {"key":"BYKE"},
		    {"key":"CYCLE"}]

    $.each(vehicals, function (key, value) {
	$(".dropdown-menu").append('<li role = "presentation"  class="type dropdown-menu-li" >').append($("<a href='#' role='menuitem' class='menuitemanchor'></a>").val(value.key).html(value.key));
    });


    // Modify vehical info.
    var a = window.location.pathname;
    var id = a.split('/')[a.split('/').length - 2];
    $.ajax({
	type: "GET",
	url: '/vehicals/'+id,
	dataType: 'json',
	success: function (data, status, jqXHR) {
	    // Set value to Html data.
	    $("#vname").val(data.vehical_name)
	    $("#vnumber").val(data.vehical_number)
	    $(".vtype").text(data.vehical_type)
	    $("#intimepicker").val(data.vehical_intime)
	    $("#outtimepicker").val(data.vehical_outtime)
	    $("#c1").val(data.park_fare)
	},
	error: function (jqXHR, status, err) {
	    alert("error !!");
	}
    });

    // On click set drop down value.
    var vehicalType;
    $('.menuitemanchor').click(function(e){
	$('.vtype').text(this.innerHTML);
	vehicalType = $('.vtype').text()
    });


    $(document).on('click', '#update_btn', function(){
	vehicalName = $('#vname').val();
	vehicalNumber = $('#vnumber').val();
	vehicalType = vehicalType.toLowerCase();
	vehicalIntime = $('#intimepicker').val();
	vehicalOuttime = $('#outtimepicker').val();
	parkFare = $('#c1').val();

	//preparing data before PUT
	data = {
	    vehical_name: vehicalName,
	    vehical_number: vehicalNumber,
	    vehical_type:vehicalType,
	    vehical_intime:vehicalIntime,
	    vehical_outtime: vehicalOuttime,
	    park_fare: parkFare,
	    csrfmiddlewaretoken: '{{ csrf_token }}'
	}

	$.ajax({
	    type: "PUT",
	    url: '/vehicals/'+id,
	    data: data,
	    dataType: 'json',
	    success: function (data, status, jqXHR) {
		alert("Updated record's successfully!!!")
		location.url = 'http://localhost:8000/'
	    },
	    error: function (jqXHR, status, err) {
		alert("error !!");
	    }
	});
    });
});
