




var ctx, w, h;
var grid0;
var grid1;


var x, y;


window.onload = function ()
{
    
    var canvas = document.getElementById("canvas");
	
	
    if(canvas.getContext) 
    {
        ctx = canvas.getContext("2d");
        
		w = canvas.width = 200; 
        h = canvas.height = 200; 
		
		grid0 = [];
		grid1 = [];
		
		for(x=0;x<h;x++)
		{	
			grid0[x] = [];
			grid1[x] = [];
			
			for(y=0;y<w;y++)
			{
				let state = 0;
				let color_state = color(state);
				
				grid0[x][y] = state;
				grid1[x][y] = state;
			}
		}
		
		
		grid0[h/2][w/2] = 100000; 
		
		draw();
    }

};

function color(c)
{
	if (c === 0) return "#ffe6f0";
	if (c == 1) return "#ff99c2";
	if (c == 2) return "#ff0066";
	if (c == 3) return "#800033";
}


function draw()
{
	
	copygrid();	
	overflow();
	paint();
	grid0 = grid1;
	
	window.requestAnimationFrame(draw);   
}

function copygrid()
{
	//ctx.clearRect(0, 0, w, h);
	for(x=0;x<h;x++)
	{	for(y=0;y<w;y++)
		{
			let cur_state = grid0[x][y]; 
			
			if(cur_state < 4) grid1[x][y] = cur_state;
			
		}
	}
	
}

 
function overflow()
{
	for(x=0;x<h;x++)
	{	for(y=0;y<w;y++)
		{
			let cur_state = grid0[x][y]; 
			
			if(cur_state > 3) 
			{
				grid1[x][y] = (cur_state - 4);
				
				if((x-1) >= 0) grid1[x-1][y]++; 
				if((x+1) < h)  grid1[x+1][y]++;  
				if((y-1) >= 0) grid1[x][y-1]++; 
				if((y+1) < w)  grid1[x][y+1]++;  
			}
		}
	}
	
}
 
 
 
function paint()
{
	for(x=0;x<h;x++)
	{	for(y=0;y<w;y++)
		{
			let state = grid1[x][y]; 
			
			let color_state;
			
			if(state < 4) color_state = color(state);
			else color_state = "#fff";
			
			ctx.fillStyle = color_state;
			ctx.fillRect(x, y, 1, 1);
		
		}
	}
		
}
	
