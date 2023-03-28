$(function () {
  // Creates a listener event linked to the save button on the webpage which saves 
  // the inputted text into local storage according to the time block it was
  // entered into
  function saveInput() {
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function() {
      var key = $(this).parent().attr('id');
      var value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  };
  // Changes the attributes of the time block according to the current local time 
  // of day by the hour to indicate whether the hour has passed, is current, or 
  // is in the future
  function timeColor() {
    var currentHour = dayjs().format('H');
    var blockHour = $('.time-block');
    if (blockHour < currentHour) {
      blockHour.removeClass('present past').addClass('future')
    } else if (blockHour == currentHour) {
      blockHour.removeClass('future past').addClass('present')
    } else {
      blockHour.removeClass('present future').addClass('past')
    };
  };
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $('.time-block').each(function () {
    var key = $(this).attr('id');
    var value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });
  // Displays the current local date and time at the top of the schedule
  function displayToday() {
    var currentDay = $('#currentDay');
    var today = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    currentDay.text(today);
  };
  // All functions are called:
  // the button is activated,
  saveInput();
  // time blocks are set to change according to real time
  timeColor();
  // and the current time display resets in real time as well
  setInterval(displayToday, 1000);
});