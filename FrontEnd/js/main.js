function toggle_visibility(id, view) {
       var e = document.getElementById(id);
       if(view == 'hide')
          e.style.display = 'none';
       else
          e.style.display = 'block';
   }

function show_more_menu(value) {
  var x = document.getElementById("first_name2");
  x.value = value;
  myFunction();
}
function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}
var toggleValue = true;
function myFunctionMain () {
    var x = document.getElementById("first_name2");
    var y = document.getElementById("submit_button");
    x.disabled = true
    y.disabled = true
    $('#logo-container').text('#' + x.value);
    if(toggleValue == true){
      toggleValue = false;
      $('#napsMainListen').text('Refreshing');
    }else{
      toggleValue = true;
      $('#napsMainListen').text('Amrit Singh Bains');
    }
    myFunction();
    setTimeout(function(){ 
      console.log('called')
      myFunctionMain();
    }, 3000); 
}

var nameList = [];
var photoList = [];
function myFunction() {
    var x = document.getElementById("first_name2");
    var y = document.getElementById("submit_button");

    // y.disabled = true;
    if(x.value.length < 1){
      y.disabled = false;
      return 1;
    }

    // toggle_visibility('loadingMask', 'show');
    $.ajax({url: "https://hashtagunification.herokuapp.com/?q=" + x.value.trim(), success: function(result){
        console.log(result);
        // toggle_visibility('loadingMask', 'hide');
        var idList = [];
        
          for(var i=0; i<result.length; i++){
            if(i == result.length - 1){
              document.getElementById("cardMain").innerHTML = result[i].name;
              document.getElementById("cardSub").innerHTML = result[i].name +
                '<p>' + result[i].text + '</p>';
              document.getElementById("cardImage").innerHTML = '<img class="activator" '+
              'src="' + result[i].profile_image_url + '">';
              
            }
            if($("#" + result[i].id).length == 0){
              idList.push(result[i].id);
              nameList.push(result[i].name);
              photoList.push(result[i].profile_image_url);
              $("#listOfPeople").prepend('<div style="display: none;" id="' + result[i].id + '"><li class="collection-item avatar">'+
                '<i class="circle"> <img src="' + result[i].profile_image_url + '" height="50px" width="50px" /></i>'+
                  // '<i>profile_image_url</i>'+
                  ' <span class="title"><b>' + 
                  result[i].name + '</b> <div style="text-align: right;margin-top: -20px;font-size: 12px;">'+
                  parseTwitterDate(result[i].created_at) + 
                  '</div></span><p style="text-align:left;">' + result[i].text + ' </p></li></div>');
                  // $("#" + result[i].id).fadeIn('slow');

            }
          }

          var counter = 0;
          function showIt(){
            setTimeout(function(){ 
            console.log(idList[counter]);
                                
                $("#" + idList[counter++]).show();
                if(idList[counter] != undefined){
                  showIt();
                }
            }, 600); 
          }
          showIt();

          $('#metaInfo').empty();
          for(var i=nameList.length-10; i<nameList.length; i++){


              $('#metaInfo').append('<div style="margin-left: 10px; margin-top:5px;" class="chip">'+
                '<img src="' + photoList[i] + '" alt="Contact Person">'+
                nameList[i] + '</div>');

            }
        }});
}

function parseTwitterDate(tdate) {
    var system_date = new Date(Date.parse(tdate));
    var user_date = new Date();
    if (K.ie) {
        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
    }
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {return "just now";}
    if (diff < 20) {return diff + " seconds ago";}
    if (diff < 40) {return "half a minute ago";}
    if (diff < 60) {return "less than a minute ago";}
    if (diff <= 90) {return "one minute ago";}
    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {return "1 hour ago";}
    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {return "1 day ago";}
    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {return "1 week ago";}
    return "on " + system_date;
}

// from http://widgets.twimg.com/j/1/widget.js
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();