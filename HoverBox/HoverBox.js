function HoverBoxObj() {
  var me = this;

  me.hasTooltipClass = '.HBHasHoverBox';

  me.dataTitle = 'hbtitle';
  me.dataBody = 'hbbody';
  me.dataBodyElem = 'hbbodyelem';

  me.tooltipHeaderClass = 'HBHeader';
  me.tooltipBodyClass = 'HBBody';

  me.tooltipID = 'HoverBox';

  me.tooltip = null;

  // create HoverBox element
  $('body').append('<div id="' + me.tooltipID + '"><div class="' + me.tooltipHeaderClass + '"></div><div class="' + me.tooltipBodyClass + '"></div></div>');
  me.tooltip = $('#' + me.tooltipID);


  // When the mouse enters an element with .HasTooltip, set the content of
  // the tooltip and display it. Finally, start watching mouse movement on
  // the entire document so the tooltip moves with the mouse.
  $(me.hasTooltipClass).mouseenter(function() {
    var titleText = $(this).attr(HoverBox.dataTitle);
    var bodyText = $(this).attr(HoverBox.dataBody);
    var bodyElem = $($(this).attr(HoverBox.dataBodyElem)).clone();
    
    // make sure that at least the title or body has been set
    if((titleText && titleText.trim()) ||
       (bodyText && bodyText.trim()) ||
       bodyElem.length)
    {
      HoverBox.tooltip.children('.' + HoverBox.tooltipHeaderClass).append(titleText);
      HoverBox.tooltip.children('.' + HoverBox.tooltipBodyClass).append(bodyText);
      HoverBox.tooltip.children('.' + HoverBox.tooltipBodyClass).append(bodyElem);
      HoverBox.tooltip.css({'display': 'block'});
      $(document).mousemove(HoverBox.DisplayHoverbox);
    }//end if
  });

  // Empty the tooltip and hide it when the mouse leaves an element with
  // .HasTooltip. Also, stop watching for mouse movement.
  $(me.hasTooltipClass).mouseout(function() {
    HoverBox.tooltip.children('.' + HoverBox.tooltipHeaderClass).empty();
    HoverBox.tooltip.children('.' + HoverBox.tooltipBodyClass).empty();
    HoverBox.tooltip.css({'display': 'none'});
    $(document).off('mousemove', HoverBox.DisplayHoverbox);
  });

  // sets the position of the tooltip based on the location of the pointer
  HoverBoxObj.prototype.DisplayHoverbox = function(ev) {
    var x;
    var y;
    
    var xOffset = 20;
    var yOffset = 5;
    
    // find x position
    if((ev.clientX + me.tooltip.width() + xOffset) > $(window).width())
    {
      x = ev.clientX - me.tooltip.width() - xOffset;
    }//end if
    else
    {
      x = ev.clientX + xOffset;
    }//end else
    
    // find y position
    if((ev.clientY + me.tooltip.height() + yOffset) > $(window).height())
    {
      y = ev.clientY - me.tooltip.height() - yOffset;
    }//end if
    else
    {
      y = ev.clientY + yOffset;
    }//end else
    
    me.tooltip.offset({
      top: y,
      left: x});
  }

};

var HoverBox = new HoverBoxObj();
