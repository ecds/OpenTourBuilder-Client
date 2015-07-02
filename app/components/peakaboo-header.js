import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var $peakaboo = Ember.$("header.peakaboo"),
        offset = $peakaboo.offset().top,
        $mini = $peakaboo.clone().addClass('mini');

        $mini.insertAfter($peakaboo);

    var scrollTimer = null;
    Ember.$(window).scroll(function () {
        handleScroll();
        stickArticles();
    });

   function handleScroll(){
      var scrollBP = offset + $peakaboo.height()*0.95;
      var scrollTop = Ember.$(window).scrollTop();
      if (scrollTop > scrollBP){
        $mini.css({'display':'block'});
        $peakaboo.addClass('p-hidden');
      }
      else{
        $mini.css({'display':'none'});
        $peakaboo.removeClass('p-hidden');
      }

      if (scrollTop > (scrollBP + $peakaboo.height()) ){
        $mini.addClass('shadow');
      }
      else{
        $mini.removeClass('shadow');
      }
    }

    function stickArticles(){
        var $window = Ember.$(window),
            docViewTop = $window.scrollTop(),
            docViewBottom = docViewTop + $window.height();

        var clearance = 200;
        var $article = Ember.$('.tour-list>article:not(.stuck)').first();
        var elemTop = $article.offset().top;
        var elemBottom = elemTop + $article.height()+200;

        if((docViewBottom > elemBottom ) && (docViewTop >= elemTop) ){
          $article.css({'height': $article.height()});
          $article.addClass('stuck').addClass('stuck-bottom');
          if($article.height()>$window.height()){
            $article.children('.container').css({'bottom':'200px'});
          }
        }

        var $stuck_article = Ember.$('.tour-list>article.stuck').last();
        if($stuck_article.length>0){
          var stuck_elemTop = $stuck_article.offset().top;
          var stuck_elemBottom = stuck_elemTop + $stuck_article.height()+clearance;

          if((docViewTop < stuck_elemTop) || (docViewBottom < stuck_elemBottom) ){
            $stuck_article.css({'height': ''});
            $stuck_article.removeClass('stuck-bottom').removeClass('stuck');
            $stuck_article.children('.container').css({'bottom':''});
          }
        }

    }
  }
});
