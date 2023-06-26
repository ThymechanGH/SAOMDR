/**
 * common.js
 *
 * Variable(変数設定)
 * smooth scroll
 * pagetop
 * loading
 * bg fixed
 * Magnific Popup
 * ----------------------------------------------------------------------------
 */




// Variable(変数設定)
// ==============================
var _speed = 400,
    _pagetop = '.btn-pagetop',
    _breakpoint = 959,
    resize_timer = false;

$(function(){



  $(window).on({
    'load': function() {
        canvasApp('animation-kirito');
        canvasApp('animation-asuna');
        canvasApp('animation-shinon');
    },
  });
});




// smooth scroll
// ==============================
function smoothScroll(){
  $(_pagetop).on('click', function(e){
    e.preventDefault();
    if( $(this).is(_pagetop) ) {
      var position = 0;
    } else {
      var href = $(this).attr('href');
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
    }
    $('html, body').animate({
      scrollTop: position
    }, _speed);
    return false;
  });
}




// Canvas
// ==============================
function canvasApp(animationID){
    var theCanvas = document.getElementById(animationID); //canvasのidを指定
    var context = theCanvas.getContext('2d');
    var counterW = 0; //横軸のカウンターをセット
    var counterH = 0; //縦軸のカウンターをセット
    var setImg = new Image();

      setImg.addEventListener('click', startUp, false);
      setImg.src= $('#' + animationID).data('canvas-img'); //読み込む画像の指定

    // アニメーションのループ
    function startUp(){
      var timer = setInterval(function(){
        context.fillStyle="#000000"; //canvasの背景色
        context.fillRect(0, 0, 480, 852); //canvasの座標+サイズ
        context.drawImage(setImg, 480*counterW, 852*counterH, 480, 852, 0, 0, 480, 852); //canvasに配置した画像の座標を指定
        counterW++; //横軸カウンターを+1
        if (counterW >= 10) {
          counterW = 0; //横軸カウンターをリセット
          counterH++; //縦軸カウンターを+1
        }

        if( animationID == 'animation-kirito' ) {
          if (counterH >= 5) {
            counterH = 0; //縦軸カウンターをリセット
            clearInterval(timer); //ループを停止
            $('.btn-replay[data-canvas-stop="'+animationID+'"]').css({display: 'block'}); //#replay要素を表示
          }
        } else if( animationID == 'animation-asuna' ) {
          if (counterH >= 4) {
            counterH = 0; //縦軸カウンターをリセット
            clearInterval(timer); //ループを停止
            $('.btn-replay[data-canvas-stop="'+animationID+'"]').css({display: 'block'}); //#replay要素を表示
          }
        } else if( animationID == 'animation-shinon' ) {
          if (counterH >= 4 && counterW >= 1) {
            counterW = 0; //横軸カウンターをリセット
            counterH = 0; //縦軸カウンターをリセット
            clearInterval(timer); //ループを停止
            $('.btn-replay[data-canvas-stop="'+animationID+'"]').css({display: 'block'}); //#replay要素を表示
          }
        }
      }, 100);
    }


    // アニメーション #replay要素をクリックしたら動作
    // ============================================================
    $('.btn-replay[data-canvas-stop="'+animationID+'"]').on('click', function(){
      startUp(); //アニメーションのループ
      $(this).css({display: 'none'}); //#replay要素を非表示
    });




  // アニメーション スクロールスタート
  // ============================================================
  var scrFlag = false;

  // スクロール値を取得
  $(window).scroll(function(){

    scrTop = $(document).scrollTop(); // スクロール値を取得
    scrPos = $(window).innerHeight(); // ウィンドウの高さを取得

    // オブジェクトのあるブロックのTOP値を取得
    scrSlide = $('#' + animationID).offset().top;

    // オブジェクトの位置が画面の1/5を超えたら動作を開始
    if( scrTop >= scrSlide - scrPos*0.5 ) {
      if(!scrFlag) {
        scrFlag = true;
        startUp();
      }
    }
  });


}