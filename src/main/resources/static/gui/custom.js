example.View = draw2d.Canvas.extend({

    
    onDraw : function(type,x,y)
    {
        var type = type
        var figure = eval("new "+type+"();");
        // create a command for the undo/redo support
        var command = new draw2d.command.CommandAdd(this, figure, x, y);
        this.getCommandStack().execute(command);
    }
});
