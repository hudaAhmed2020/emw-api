// declare the namespace for this example
var example = {};

/**
 * 
 * The **GraphicalEditor** is responsible for layout and dialog handling.
 * 
 * @author Andreas Herz
 * @extends draw2d.ui.parts.GraphicalEditor
 */
example.Application = Class.extend(
{
    NAME : "example.Application", 

    /**
     * @constructor
     * 
     * @param {String} canvasId the id of the DOM element to use as paint container
     */
    init : function()
    {
	      this.view    = new example.View("canvas");
          this.toolbar = new example.Toolbar("toolbar",  this.view );
	       
	       
	       // layout FIRST the body
	       this.appLayout = $('#container').layout({
	   	     west: {
	              resizable:false,
	              closable:true,
	              resizeWhileDragging:false,
				  paneSelector: "#navigation2",
				  size :230
	            },
	            center: {
	              resizable:true,
	              closable:true,
	              resizeWhileDragging:true,
	              paneSelector: "#content"
				},
				east: {
					resizable:false,
					closable:true,
					resizeWhileDragging:true,
					paneSelector: "#navigation",
					size :200,
					resizable:true,
						
				  }
	       });
	      
	       //
	       this.contentLayout = $('#content').layout({
	   	     north: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
                  size:50,
	              paneSelector: "#toolbar"
	            },
	            center: {
	              resizable:false,
	              closable:false,
                  spacing_open:0,
                  spacing_closed:0,
	              paneSelector: "#canvas"
	            }
	       });
	}
});
