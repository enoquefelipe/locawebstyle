var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    container    : 'body',
    module       : '[data-ls-module="popover"]',
    idPopover    : '#ls-popover-',
    popoverClass : '.ls-popover',
    trigger      : 'click',
    events: {
      created: 'popover:created',
      clicked: 'popover:clicked',
      builded: 'popover:builded',
      targetSetted: 'popover:hastarget',
      checkedExistence: 'popover:exist'
    }
  }

  function init() {
    bindPopover();
    setPosition();
    setTarget();
    buildPopover();
    checkExists();
  }

  // Check if popovers exists. If not, create that.
  function checkExists() {
    $(config.module).each(function(index, el) {
      if(!$(config.idPopover+index).length) {
        $(document).trigger(config.events.checkedExistence, [index, el]);
      }
    });
  }

  function buildPopover(index, el) {
    var data = {
      index        : index,
      title        : $(el).data('title'),
      content      : $(el).data('content'),
      placement    : $(el).data('placement'),
      customClasses: $(el).data('custom-class')
    }
    setTarget(index, el);
    $(config.container).append(locastyle.templates.popover(data));
    setPosition(index, el);
  }

  // Define position of popover
  function setPosition(index, el) {
    var data = {
        target    : $(el).data('target'),
        top       : $(el).offset().top,
        left      : $(el).offset().left,
        width     : $(el).outerWidth(),
        height    : $(el).outerHeight(),
        placement : $(el).data('placement')
    }
    calcPosition(data);
  }

  // Calc the position of popover called
  function calcPosition(data) {
    var style;
    switch (data.placement) {
      case 'top':
        $(data.target).css({
          top : data.top  -=  12,
          left: data.left += (data.width/2 + 4)
        });
        break;
      case 'right':
        $(data.target).css({
          top : data.top  += (data.height/2 -2),
          left: data.left += (data.width + 12)
        });
        break;
      case 'bottom':
        $(data.target).css({
          top : data.top  += (data.height + 12),
          left: data.left += (data.width/2 + 4)
        });
        break;
      case 'left':
        $(data.target).css({
          top : data.top  += (data.height/2 -2 ),
          left: data.left -= 12
        });
    }
  }

  function bindPopover() {
    $(document).on(config.events.created, function() {

      // if ( !$(config.module).attr('data-trigger', 'hover').length ){
      //   console.log('true')
      // }
      //
      // var trigger = $(config.module).data('trigger') === 'hover' ? 'mouseover' : config.trigger;

      $(config.module).on('click', function() {
        $(this).trigger(config.events.clicked);
        show($(this).data('target'));
      });
    });
  }

  // Show called popover
  function show(target) {
    $(target).show();
  }

  // Hide all or visible popovers
  function hide(target) {
    $(target || config.popoverClass+':visible').hide();
  }

  // Destroy all created popovers
  function destroy() {
    $(config.popoverClass).remove();

    // Unbind all events.
    $.each(config.events, function(index, event) {
      $(document).unbind(event);
    });

  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
