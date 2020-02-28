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

		  this.OpenButton  = $("<button>open</button>");
		this.html.append(this.OpenButton);
		this.OpenButton.button().click($.proxy(function(){

			$.ajax({
				type: "GET",
				url: "/workflow",
				//data:JSON.stringify(shape),
				success: getSuccess ,
				contentType: "application/json",
				//dataType: 'json'
			  });
		},this)).button( "option", "disabled", false );


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


		this.SaveButton  = $("<button>Save</button>");
        		this.html.append(this.SaveButton);
        		this.SaveButton.button().click($.proxy(function(){
        			console.log(customCanvas)
                                var count =customCanvas.figures.data.length
                                 var workflow= {name:" ",shapesArray:[]}

                                 workflow.name=document.getElementById("workflowName").value
                                console.log(count)
                                var figArray= new Array()
                                 for(var i = 0; i<count ;i++ )
                                {
                                    var tempShape = new Object()
                                    var previous2= new Object()
                                    var next2 = new Object()
                                    var ShapesArray2= new Array()
                                    var userdata= []
                                    tempShape.x= customCanvas.figures.data[i].x
                                    tempShape.y= customCanvas.figures.data[i].y
                                    tempShape.type= customCanvas.figures.data[i].cssClass
                                    tempShape.id= customCanvas.figures.data[i].id
                                    if(customCanvas.figures.data[i].userData!=null)
                                    {
                                            tempShape.userdata=customCanvas.figures.data[i].userData
                                    }
                                    else{
                                        tempShape.userdata=[]
                                        }
                                    if(customCanvas.figures.data[i].cssClass==="start")
                                    {
                                         previous2.type=null
                                         previous2.x=null
                                         previous2.y=null
                                         previous2.id="null"
                                    }
                                    else if(customCanvas.figures.data[i].inputPorts.data[0].connections.data.length!==0){
                                        console.log(customCanvas.figures.data[i].inputPorts.data[0].connections.data[0].sourcePort.parent.cssClass)
                                        previous2.type=customCanvas.figures.data[i].inputPorts.data[0].connections.data[0].sourcePort.parent.cssClass
                                        previous2.x=customCanvas.figures.data[i].inputPorts.data[0].connections.data[0].sourcePort.parent.x
                                        previous2.y=customCanvas.figures.data[i].inputPorts.data[0].connections.data[0].sourcePort.parent.y
                                        previous2.id=customCanvas.figures.data[i].inputPorts.data[0].connections.data[0].sourcePort.parent.id

                                    }
                                    else{
                                         previous2.type=null
                                         previous2.x=null
                                         previous2.y=null
                                         previous2.id="null"
                                    }
                                    if(customCanvas.figures.data[i].cssClass==="end")
                                    {
                                         next2.type=null
                                         next2.x=null
                                         next2.y=null
                                         next2.id="null"
                                    }
                                    else if(customCanvas.figures.data[i].outputPorts.data[0].connections.data.length!== 0){
                                        console.log(customCanvas.figures.data[i].outputPorts.data[0].connections.data[0].targetPort.parent.cssClass)
                                        next2.type=customCanvas.figures.data[i].outputPorts.data[0].connections.data[0].targetPort.parent.cssClass
                                        next2.x=customCanvas.figures.data[i].outputPorts.data[0].connections.data[0].targetPort.parent.x
                                        next2.y=customCanvas.figures.data[i].outputPorts.data[0].connections.data[0].targetPort.parent.y
                                        next2.id=customCanvas.figures.data[i].outputPorts.data[0].connections.data[0].targetPort.parent.id
                                    }
                                    else{
                                        next2.type=null
                                         next2.x=null
                                         next2.y=null
                                         next2.id="null"
                                    }
                                    tempShape.next=next2
                                    tempShape.previous=previous2

                                    ShapesArray2.push(tempShape)
                                    workflow.shapesArray.push(tempShape)
                                }
                                //Workflow.ShapesArray=ShapesArray2
                                console.log(figArray)

                                //Workflow.ShapesArray=figArray

                                console.log(workflow.shapesArray)
                                $.ajax({
                    				type: "POST",
                    				url: "/workflow",
                    				data: JSON.stringify(workflow),
                    				success: success(),
                    				contentType: "application/json",
                    				dataType: 'json'
                    			  });

        		},this)).button( "option", "disabled", true );



		this.WorkflowName  = $("<input id = 'workflowName'></input>");
                		this.html.append(this.WorkflowName);


		function success(data){
			console.log("good")
			console.log(document.getElementById("workflowName").value)

		  }
		  function getSuccess(data)
                              {
                                console.log("GET SUCCESS")
                                 console.log(data)
                                 console.log(data.name)
                                 console.log(data.shapesArray)
                                 var temp=data.shapesArray
                                 console.log(temp)
                                  var i =0
                                  var count=0
                                  var count2=0
                                  var size=0
                                  var shapesDone=0

                                  while(data.shapesArray[count2].type!=="start")
                                  {
                                      count2++
                                  }
                                 size=data.shapesArray.length
                                  var nextShape
                                  for(var x = 0;x <size-1;x++)
                                  {

                                        var count3=0
                                      if(count===0){
                                            var type = data.shapesArray[count2].type
                                            var figure = eval("new "+type+"();");
                                            customCanvas.add( figure, data.shapesArray[count2].x,data.shapesArray[count2].y);
                                           // customCanvas.figures.data[shapesDone].userData=data.shapesArray[count2].userdata
                                           // shapesDone++
                                            var type2=data.shapesArray[count2].next.type;
                                            nextShape=data.shapesArray[count2].next
                                            console.log(type);
                                            console.log(type2)
                                            var figure2=  eval("new "+type2+"();");
                                           customCanvas.add( figure2, data.shapesArray[count2].next.x,data.shapesArray[count2].next.y);
                                           //customCanvas.figures.data[shapesDone].userData=data.shapesArray[count2].userdata
                                           //shapesDone++
                                           count++;
                                       }
                                       else{
                                       figure=figure2
                                       while(nextShape.y!==data.shapesArray[count3].y||nextShape.x!==data.shapesArray[count3].x||nextShape.type!==data.shapesArray[count3].type)
                                       {
                                            count3++
                                       }

                                       nextShape=data.shapesArray[count3].next
                                       type2=data.shapesArray[count3].next.type
                                       var figure2 = eval("new "+type2+"();");
                                       customCanvas.add( figure2, nextShape.x,nextShape.y);
                                       //customCanvas.figures.data[shapesDone].userData=data.shapesArray[count3].userdata
                                       //shapesDone++

                                       console.log(type+"      ff   " +type2)
                                       }

                                        var c = new draw2d.Connection();
                                        c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator());
                                        c.setTargetDecorator(new draw2d.decoration.connection.BarDecorator());
                                        c.setSource(figure.getOutputPort(0));
                                        c.setTarget(figure2.getInputPort(0));
                                        customCanvas.add(c);
                                      i++;
                              }
                              }


		// Inject the REDO Button and the callback
		//



	/**
	 * @method
	 * Called if the selection in the cnavas has been changed. You must register this
	 * class on the canvas to receive this event.
	 *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
	 */
	 },
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

