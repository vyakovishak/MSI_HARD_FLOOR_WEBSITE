$('.button').click(function(){
  var $btn = $(this),
      $step = $btn.parents('.modal-body'),
      stepIndex = $step.index(),
      $pag = $('.modal-header span').eq(stepIndex);
var va = new FormData();
  if(stepIndex < 8 ) {
         va = step1($step, $pag);

  }
  else {
    done($step, $pag, va);
  }
  
});


function step1($step, $pag){

  // animate the step out
  $step.addClass('animate-out');
  
  // animate the step in
  setTimeout(function(){
    $step.removeClass('animate-out is-showing')
         .next().addClass('animate-in');
    $pag.removeClass('is-active')
          .next().addClass('is-active');
  }, 600);
  
  // after the animation, adjust the classes
  setTimeout(function(){
    $step.next().removeClass('animate-in')
          .addClass('is-showing');
    
  }, 1200);

}


function done($step, $pag,va ){
  //start
  var data = {};

  for (let form of document.querySelectorAll("form")){
      for (let input of form.querySelectorAll("input")){
          
          if (input.type == "checkbox"){
              if(input.checked == false){
                  continue
              }
          }

          let key = input.name
          let value = input.value

          if (Object.keys(data).includes(key)){
              let old_value = data[key]
              let new_value = old_value +', ' + value
              data[key] = new_value
          }
          else{
              data[key] = value
          }
      }
  }

  var formData = new FormData();
  for (let key of Object.keys(data)){
      formData.append(key, data[key])
  }


  for (let entry of formData){
      console.log(entry[0] + ': ' + entry[1])
  }

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxgsZX9U4kkFlQ5wQosAhVcfmDUMqxh10m7USd3c1aRK6VS1dHIkgd-IqNqesWmPCIFLA/exec'

  
  fetch(scriptURL, { method: 'POST', body: (formData) })
    .then(response => alert("You have successfully submitted."))
    .catch(error => console.error('Error!', error.message))

  //end

  // animate the step out
  $step.parents('.modal-wrap').addClass('animate-up');



  $('.modal-header span').first().addClass('is-active')
                          .siblings().removeClass('is-active');
 $(this).hide();
};