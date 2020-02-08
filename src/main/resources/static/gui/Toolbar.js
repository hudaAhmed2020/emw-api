example.Toolbar = Class.extend({
	
	init:function(elementId, view){
		this.html = $("#"+elementId);
		this.view = view;
		
		
		// register this class as event listener for the canvas
		// CommandStack. This is required to update the state of 
		// the Undo/Redo Buttons.
		//
		view.getCommandStack().addEventListener(this);

		// Register a Selection listener for the state hnadling
		// of the Delete Button
		//
        view.on("select", $.proxy(this.onSelectionChanged,this));
		
		// Inject the UNDO Button and the callbacks
		//
		this.undoButton  = $("<button>Undo</button>");
		this.html.append(this.undoButton);
		this.undoButton.button().click($.proxy(function(){
		       this.view.getCommandStack().undo();
		},this)).button( "option", "disabled", true );

		/////////////////////

		this.SaveButton  = $("<button>Save</button>");
		this.html.append(this.SaveButton);
		this.SaveButton.button().click($.proxy(function(){
				var i=0;
			//	var x=$.serialize(shapeArr);
			$.ajax({
				type: "POST",
				url: "http://localhost:8080/shape",
				//data:{"x":shape.x,"y":shape.y,"type":shape.type},
				//data: JSON.stringify({ shapeArr: shapeArr }),
				data: JSON.stringify(shapeArr),
				success: success(),
				contentType: "application/json",
				dataType: 'json'
			  });
		},this)).button( "option", "disabled", true );

		
		  ////////////
		  this.OpenButton  = $("<button>open</button>");
		this.html.append(this.OpenButton);
		this.OpenButton.button().click($.proxy(function(){

			$.ajax({
				type: "GET",
				url: "http://localhost:8080/shape",
				//data:JSON.stringify(shape),
				success: getSuccess ,
				contentType: "application/json",
				//dataType: 'json'
			  });
		},this)).button( "option", "disabled", false );

		function success(data){
			console.log("good")

		  }
		function getSuccess(data)
            {
              console.log("GET SUCCESS")
			  console.log(data)
			  //console.log(customCanvas )     
				//for (var i = 0 ; i<data.length ;i++)
				var i =0 
				while(data[i]!==null&& data[i+1]!==null)
				{
              		var type = data[i].type
              		var figure = eval("new "+type+"();");
					  
					  var type2=data[i+1].type
					  var figure2 = eval("new "+type2+"();");
					
				
				// ...add it to the canvas 
				customCanvas.add( figure, data[i].x,data[i].y);
				customCanvas.add( figure2, data[i+1].x,data[i+1].y);
		
				// Create a Connection and connect the Start and End node
				//
				var c = new draw2d.Connection();
		
				// Set the endpoint decorations for the connection
				//
				c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
				c.setTargetDecorator(new draw2d.decoration.connection.BarDecorator());   
				// Connect the endpoints with the start and end port
				//
				c.setSource(figure.getOutputPort(0));
				c.setTarget(figure2.getInputPort(0));
		
				// and finally add the connection to the canvas
				customCanvas.add(c);  
				i++
				}


            }
		// Inject the REDO Button and the callback
		//
		this.redoButton  = $("<button>Redo</button>");
		this.html.append(this.redoButton);
		this.redoButton.button().click($.proxy(function(){
		    this.view.getCommandStack().redo();
		},this)).button( "option", "disabled", true );
		
		this.delimiter  = $("<span class='toolbar_delimiter'>&nbsp;</span>");
		this.html.append(this.delimiter);

		// Inject the DELETE Button
		//
		this.deleteButton  = $("<button>Delete</button>");
		this.html.append(this.deleteButton);
		this.deleteButton.button().click($.proxy(function(){
			var node = this.view.getPrimarySelection();
			var command= new draw2d.command.CommandDelete(node);
			this.view.getCommandStack().execute(command);
		},this)).button( "option", "disabled", true );
	},

	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	onSelectionChanged : function(emitter, event){
		this.deleteButton.button( "option", "disabled", event.figure===null );
	},
	
	/**
	 * @method
	 * Sent when an event occurs on the command stack. draw2d.command.CommandStackEvent.getDetail() 
	 * can be used to identify the type of event which has occurred.
	 * 
	 * @template
	 * 
	 * @param {draw2d.command.CommandStackEvent} event
	 **/
	stackChanged:function(event)
	{
		this.undoButton.button( "option", "disabled", !event.getStack().canUndo() );
		this.SaveButton.button( "option", "disabled", !event.getStack().canUndo() );

		this.redoButton.button( "option", "disabled", !event.getStack().canRedo() );
	}
});

