$( function() {

     $.ajax({
       url: 'https://raw.githubusercontent.com/devjanaprime/2.4-jQueryAjaxJSON/master/students.json',
       dataType: 'json',
       success: function( data ){
         //declaring global variables and functions for success
         var x = 0; //x is used to keep track of current array we are in
         var studentArray = data.students;
         var currentInfo = studentArray[x].first_name + ' ' + studentArray[x].last_name + ',  city: ' + studentArray[x].city + ',  shoutout: ' + studentArray[x].shoutout;
         var changeIndex = function(){
           if(x === 0){
             x = 20;
           }else if(x === 20){
             x = 0;
           }
         };
         //appending buttons on (documtent).ready and data success
         var newButtonPrev = document.createElement('button');
         newButtonPrev.textContent = 'previous';
         newButtonPrev.id = 'previous';
         newButtonPrev.className = 'button';
         var prevButton = new $('#container').append(newButtonPrev);

         for (var i = 0; i < studentArray.length; i++) {
           var studentName = studentArray[i].first_name;
           var newButtonStudent = document.createElement('button');
           newButtonStudent.textContent = studentName;
           newButtonStudent.id = studentName;
           newButtonStudent.className = 'button';
           var studentButton = new $('#container').append(newButtonStudent);
           console.log(newButtonStudent.className);
         }
         var newButtonNext = document.createElement('button');
         newButtonNext.textContent = 'next';
         newButtonNext.id = 'next';
         newButtonNext.className = 'button';
         var nextButton = new $('#container').append(newButtonNext);
         //setting initial student info with first student in object
         $('#studentInfo').html(currentInfo);
         $('#number').html((x + 1) + '/' + studentArray.length);
         //declaring interval for moving to next student info
         var timer = setInterval(function(){
           $('#studentInfo').fadeOut('slow', function(){
             x++;
             changeIndex();
             $('#studentInfo').html(studentArray[x].first_name + ' ' + studentArray[x].last_name + ',  city: ' + studentArray[x].city + ',  shoutout: ' + studentArray[x].shoutout);
             $('#studentInfo').fadeIn('slow');
             $('#number').html((x + 1) + '/' + studentArray.length);
           });
         }, 10000);
         //declaring function I will use to reset the interval when prev or next button clicked
         function resetInterval() {
             clearInterval(timer);
             timer = setInterval(function () {
               $('#studentInfo').fadeOut('slow', function(){
                 x++;
                 changeIndex();
                 $('#studentInfo').html(studentArray[x].first_name + ' ' + studentArray[x].last_name + ',  city: ' + studentArray[x].city + ',  shoutout: ' + studentArray[x].shoutout);
                 $('#studentInfo').fadeIn('slow');
                 $('#number').html((x + 1) + '/' + studentArray.length);
               });
             }, 10000);
         }

         //on click event to switch student ino
         $(document).on('click', '.button', function(){
           var $this = (this).id;
           //fade out current info
           $('#studentInfo').fadeOut('slow', function(){
             if($this == newButtonPrev.id){
               changeIndex();
               x--;
               //inserting new student info then fading it in
               $('#studentInfo').html(studentArray[x].first_name + ' ' + studentArray[x].last_name + ',  city: ' + studentArray[x].city + ',  shoutout: ' + studentArray[x].shoutout);
               $('#studentInfo').fadeIn('slow');
               $('#number').html((x + 1) + '/' + studentArray.length);
               resetInterval();
             } else if ($this == 'next') {
               x++;
               changeIndex();
               //inserting new student info then fading it in
               $('#studentInfo').html(studentArray[x].first_name + ' ' + studentArray[x].last_name + ',  city: ' + studentArray[x].city + ',  shoutout: ' + studentArray[x].shoutout);
               $('#studentInfo').fadeIn('slow');
               $('#number').html((x + 1) + '/' + studentArray.length);
               resetInterval();
             } else {
               //going through student array to find student info corresponding to button clicked
               for (var i = 0; i < studentArray.length; i++) {
                 var studentName = studentArray[i].first_name;
                 if($this == studentName){
                   $('#studentInfo').html(studentArray[i].first_name + ' ' + studentArray[i].last_name + ',  city: ' + studentArray[i].city + ',  shoutout: ' + studentArray[i].shoutout);
                   $('#studentInfo').fadeIn('slow');
                   x = i;
                   $('#number').html((x + 1) + '/' + studentArray.length);
                 }
               }
             }
            });
           });
         }, // end success
       statusCode: {
          404: function(){
             alert( 'error connecting to server' );
          } // end 404
        } // end statusCode



     }); // end ajax  object

  });
