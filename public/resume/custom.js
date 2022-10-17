$(function () {
    const multiplier = 1.5;
    $('body').mousewheel(function (event, delta) {
      this.scrollLeft -= delta * multiplier;
      event.preventDefault();
    });
  });