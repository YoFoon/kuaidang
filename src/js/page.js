var runPage;
runPage = new FullPage({
  id : 'pageContain',
  slideTime : 400,
  continuous : true,
  effect : {
    transform : {
      translate : 'Y',
      scale : [1, 1],
      rotate : [0, 0]
    },
    opacity : [0, 1]
  },
  mode : 'wheel,touch',
  easing : 'ease'
});