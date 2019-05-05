var myDiv = $(".visualContainerGroup");
var slideNumbers = 0;
var cancelAnimation = true;

// conta número de slides
slideNumbers = $('.visualContainerGroup .innerSlide').length;

// função tamanho total do div com scroll
function scrollSize() {
  return myDiv.get(0).scrollWidth;
};

// função tamanho do scroll menos viewport
function scrollViewPortSize() {
  return scrollSize() - myDiv.innerWidth()
};

// verificar se numero de slides é par
function isEven() {
  return slideNumbers % 2 == 0;
};

// função ponto médio do scroll
function midScroll() {
  if (isEven() == true) {
    return myDiv.offset().left + ((scrollViewPortSize() / 2) - (innerSlideWidth() / 2));
  } else {
    return myDiv.offset().left + (scrollViewPortSize() / 2);
  }
};

// função ponto médio para 4 layouts simultaneos
function midScroll4() {
  var midPoint = ((innerSlideWidth() * 4) / 2) + containerLeftDimensions();
  return midPoint - (myDiv.innerWidth() / 2) - 1;
}

// função alinhamento do layout
function layoutAlign() {
  myDiv.stop();
  if (cancelAnimation == true) {
    if (window.innerWidth < 992) {
      myDiv.animate({scrollLeft: midScroll()});
    }
    if (window.innerWidth > 992) {
      myDiv.animate({scrollLeft: midScroll4()});
      $('#setaEsquerda').css("display", "none")
    }
  }
};

layoutAlign();

// rodar alinhamento ao mudar tamanho da tela
document.getElementsByTagName("BODY")[0].onresize = function() {
  layoutAlign();
};

// função tamanho total do slide com margin
function innerSlideWidth() {
  return $('.innerSlide').outerWidth(true);
};

// função para pegar posição do scroll horizontal
function horizontalPosition() {
  return myDiv.scrollLeft();
};

// função para pegar padding do container
function containerPadding() {
  return (myDiv.innerWidth() - myDiv.width());
};

// função para pegar dimensoes além do padding que possam interferir no tamanho do scroll
function containerDimensions() {
  return (scrollSize() - ((innerSlideWidth() * slideNumbers) + containerPadding()));
};

// função para pegar dimensoes paddin e dimensoes extras na esquerda do scroll
function containerLeftDimensions() {
  return (containerDimensions() / 2) + (containerPadding() / 2);
};

// função para definir os pontos de viagem do viewport para que seu centro, esteja centralizado com o do layout
function slidePoints(layoutPoint) {
  var slidePoints = [];
  slidePoints[0] = 0;
  var secondPoint = (containerLeftDimensions() + (innerSlideWidth() + (innerSlideWidth() / 2))) - (myDiv.innerWidth() / 2);
  slidePoints[1] = secondPoint;
  var slidePointCache = secondPoint;
  for (i = 2; i < slideNumbers; i++) {
    slidePointCache += innerSlideWidth();
    slidePoints[slidePoints.length] = slidePointCache;
  };
  return slidePoints[layoutPoint];
};

// console.log((containerLeftDimensions() + (innerSlideWidth() + (innerSlideWidth() / 2))))
// console.log(slideNumbers)
// console.log(innerSlideWidth() * slideNumbers)
// console.log(slidePoints(4))
// console.log(midScroll())
// console.log(scrollSize())
// console.log(innerSlideWidth())
// console.log(scrollViewPortSize())
// console.log(containerPadding())
// console.log(containerDimensions())

// roda função alinhamento ao termino do touch
document.getElementById("visualContainer").addEventListener("touchend", cardAlign);
document.getElementById("visualContainer2").addEventListener("touchend", cardAlign);
// encerra animação de alinamento quando iniciado touch ou quando em movimento
document.getElementById("visualContainer").addEventListener("touchstart", stopAnimation);
document.getElementById("visualContainer").addEventListener("touchmove", stopAnimation);
document.getElementById("visualContainer2").addEventListener("touchstart", stopAnimation);
document.getElementById("visualContainer2").addEventListener("touchmove", stopAnimation);

// função para interromper animação
function stopAnimation() {
  myDiv.stop();
  return cancelAnimation = false;
}

// função para interromper animação durante scroll, e reativar quando terminado scroll
myDiv.scroll(function() {
  cancelAnimation = false;

  clearTimeout($.data(this, "scrollCheck"));
  $.data(this, "scrollCheck", setTimeout(function() {
    cancelAnimation = true;
    cardAlign();

  }, 250));
});

//função de alinhamento dos layouts
function cardAlign() {
  if (screen.width < 992) {
    setTimeout(function() {
      if (cancelAnimation == true) {

        myDiv.css("-ms-overflow-scrolling", "auto");
        myDiv.css("overflow-scrolling", "auto");
        myDiv.css("-moz-overflow-scrolling", "auto");
        myDiv.css("-o-overflow-scrolling", "auto");
        myDiv.css("-webkit-overflow-scrolling", "auto");
        myDiv.stop();

        var firstPoint = slidePoints(1) - (innerSlideWidth() / 2);
        if (horizontalPosition() < firstPoint) {
          myDiv.animate({scrollLeft: 0});

        } else {
          for (b = 1; b < slideNumbers; b++) {
            var arrayPoint = Math.abs(horizontalPosition() - slidePoints(b));
            var x = innerSlideWidth() / 2;

            if (arrayPoint < x) {
              myDiv.animate({scrollLeft: slidePoints(b)});
              b += slideNumbers;
            }
          };
        };

        myDiv.css("-ms-overflow-scrolling", "touch");
        myDiv.css("overflow-scrolling", "touch");
        myDiv.css("-moz-overflow-scrolling", "touch");
        myDiv.css("-o-overflow-scrolling", "touch");
        myDiv.css("-webkit-overflow-scrolling", "touch");
      }
      // cancelAnimation = false;
    }, 300);
  }
};

//função para setas (centralizando por slide)
// function setaDireitaLayout() {
//   var setaDireita = horizontalPosition() + innerSlideWidth();
//   for (b = 1; b < slideNumbers; b++) {
//     var arrayPoint = Math.abs(setaDireita - slidePoints(b));
//     var x = innerSlideWidth() / 2;
//
//     if (arrayPoint < x) {
//       myDiv.animate({
//         scrollLeft: slidePoints(b)
//       });
//       b += slideNumbers;
//     }
//   };
// }
//
// function setaEsquerdaLayout() {
//   var setaEsquerda = horizontalPosition() - innerSlideWidth();
//   for (b = 0; b < slideNumbers; b++) {
//     var arrayPoint = Math.abs(setaEsquerda - slidePoints(b));
//     var x = innerSlideWidth() / 2;
//
//     if (arrayPoint < x) {
//       myDiv.animate({
//         scrollLeft: slidePoints(b)
//       });
//       b += slideNumbers;
//     }
//   };
// }

//função para setas (4 slides por vez)
function setaDireitaLayout() {
  var setaActionDireita = horizontalPosition() + innerSlideWidth() + 5;
  myDiv.animate({scrollLeft: setaActionDireita});
  $('#setaEsquerda').css("display", "block")
  $('#setaDireita').css("display", "none")

}

function setaEsquerdaLayout() {
  var setaActionEsquerda = horizontalPosition() - innerSlideWidth() - 5;
  myDiv.animate({scrollLeft: setaActionEsquerda});
  $('#setaDireita').css("display", "block")
  $('#setaEsquerda').css("display", "none")
}

//função para icone de loading
$(document).ready(function() {
  $('#imgLoader').show();
  var totalImages = $(".imgClass").length;
  var iLoaded = 0;
  $(".imgClass").each(function() {
    $(this).bind("load", function() {
      iLoaded++;
      if (iLoaded == totalImages) {
        $('#imgLoader').hide();
      }
      $(this).attr('src', $(this).attr("src"));
    });
  });
});
