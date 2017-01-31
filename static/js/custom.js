$(document).ready(function() {

    // Load  content document load
    $.ajax({
	type: "GET",
	url: "/vehicals/",
	dataType: 'json',
	success: function(data) {
	    for (var i = 0; i < data.length; i++) {
		$("#tbDetails").append("<tr><td>" + data[i].vehical_name + "</td><td>" + data[i].vehical_number + "</td><td>" + data[i].vehical_type + "</td><td>" + data[i].vehical_intime +"</td><td>"+ data[i].vehical_outtime +"</td><td>"+ data[i].park_fare +"</td></tr>");
	    }
	    console.log(data)
	},
	error: function(jqXHR, status, err){
	    console.log(err)
	}
    });


    var vehicalType;
    $('.dropdown-menu li > a').click(function(e){
	$('.vtype').text(this.innerHTML);
	vehicalType = $('.vtype').text()
    });

    // add records
    $(document).on("click","#submit_btn",function() {
	console.log(vehicalType)
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
