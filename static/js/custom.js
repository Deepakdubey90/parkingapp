$(document).ready(function() {



    function setTableContent(data)
    {
	for (var i = 0; i < data.length; i++) {
	    $("#tbDetails").append("<tr><td>" + data[i].vehical_name + "</td><td>" + data[i].vehical_number + "</td><td>" + data[i].vehical_type + "</td><td>" + data[i].vehical_intime +"</td><td>"+ data[i].vehical_outtime +"</td><td>"+ data[i].park_fare + "</td><td><p data-placement='top' data-toggle='tooltip' title='Edit'><a href='/update/vehical/"+ data[i].id +"' class='btn btn-primary btn-xs btnModify' data-id='"+ data[i].id +"'><span class='glyphicon glyphicon-pencil'></span></a></p></td><td><p data-placement='top' data-toggle='tooltip' title='Delete'><button data-id='"+ data[i].id +"' class='btn btn-danger btn-xs btnDelete' data-title='Delete' data-toggle='modal' data-target='#delete'><span class='glyphicon glyphicon-trash'></span></button></p></td></tr>");
	}
    }

    // Load  content document load
    $.ajax({
	type: "GET",
	url: "/vehicals/",
	dataType: 'json',
	success: function(data) {
	    setTableContent(data)
	},
	error: function(jqXHR, status, err){
	    console.log(err)
	}
    });


    $(document).on("click", ".btnList", function(){
	alert("called")
	location.href = 'http://localhost:8000/'
    });

    // To open model to confirm delete or cancel.
    $(document).on("click",".btnDelete",function() {
	var id = $(this).data('id');
	var $this = $(this);
	bootbox.confirm("Are you sure want to delete?", function(result) {
	    if (result){
		$.ajax({
		    type: "DELETE",
		    url: '/vehicals/'+id,
		    dataType: 'json',
		    success: function (data, status, jqXHR) {
			//location.reload();
			$this.closest('tr').remove();
		    },
		    error: function (jqXHR, status, err) {
			alert("error !!");
		    }
		});
	    }
	});
    });

    $(document).on("click",".btnAdd",function() {
	lwindow.location = 'http://localhost:8000/create/vehical/'
    })

    // Modify vehical info.
    $(document).on("click",".btnModify",function() {
	var id = $(this).data('id');
	console.log("Invoke in btnModify button before ")
	//window.location = 'http://localhost:8000/update/vehical/'+id
	console.log("Invoke in btnModify button after ")
	$(document).ready(function() {
	    console.log("Called in window load event!!!!", id)
	    $.ajax({
		type: "GET",
		url: '/vehicals/'+id,
		dataType: 'json',
		success: function (data, status, jqXHR) {
		    console.log(data.redirectll)
		    console.log("Called in success  event!!!!")
		    console.log(data)
		    console.log(data.vehical_name)
		    console.log(data.vehical_number)
		    console.log(data.vehical_type)
		    console.log(data.vehical_intime)
		    console.log(data.vehical_outtime)
		    console.log(data.park_fare)
		    console.log( $("#vname").html())
		    $("#vname").val(data.vehical_name)
		    $("#vnumber").val(data.vehical_number)
		    $(".vtype").val(data.vehical_type)
		    $("#intimepicker").val(data.vehical_intime)
		    $("#outtimepicker").val(data.vehical_outtime)
		    $("#c1").val(data.park_fare)

		},
		error: function (jqXHR, status, err) {
		    alert("error !!");
		    console.log(err)
		    console.log(status)
		}
	    });
	});
    });


    //
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
