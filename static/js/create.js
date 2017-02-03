$(document).ready(function() {

    // time picker initialization.
    $("#intimepicker").timepicker();
    $("#outtimepicker").timepicker();

    var vehicalType;
    $('.dropdown-menu li > a').click(function(e){
	$('.vtype').text(this.innerHTML);
	vehicalType = $('.vtype').text()
    });

    // add records
    $(document).on("click","#submit_btn",function() {
	vehicalName = $('#vname').val();
	vehicalNumber = $('#vnumber').val();
	vehicalType = vehicalType.toLowerCase();
	vehicalIntime = $('#intimepicker').val();
	vehicalOuttime = $('#outtimepicker').val();
	parkFare = $('#c1').val();

	//preparing data before post
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
	    type: "POST",
	    url: '/vehicals/',
	    data: data,
	    dataType: 'json',
	    success: function (data, status, jqXHR) {
		location.reload();
	    },
	    error: function (jqXHR, status, err) {
		alert("error !!");
	    }
	});
    });
});
