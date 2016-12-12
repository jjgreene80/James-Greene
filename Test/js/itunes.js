  "use strict";

		var columnObjects = {
		      "im:price": "Price",
		    "im:image": "Image", 
			"im:name": "Name",
        //"im:itemCount": "Item Count",
       
       // "im:contentType": "Content Type",
       // "rights": "Rights",
        //"title": "Title",
      
        "im:artist": "Artist",
        "category": "Category",
			  "link": "Link",
       // "im:releaseDate": "Release Date"
		}; 
		
		function makeName(elem) {
		  return elem.label ;
		}
		
		function makeImage(elem) {
		  return (elem.length>1) ? '<img class="cover" src="' +elem[1].label +'" />' : 'N/A';
		}
		
		function makeItemCount(elem) {
		  return elem.label ;
		}

		function makePrice(elem) {
		  return elem.label ;
		}

		function makeContentType(elem) {
		  return elem['im:contentType'].attributes.label  + '<br/>' + 
		      elem.attributes.label ;
		}

		function makeRights(elem) {
		  return elem.label ;
		}

		function makeTitle(elem) {
		  return elem.label ;
		}

		//function makeLink(elem) {
		  //return elem['attributes']['href'];
		//}

		function makeArtist(elem) {
		  return '<a href="'+elem['attributes']['href']+'" title="'+elem.label +'">'+elem.label+'</a>';
		}

		function makeCategory(elem) {
		  return elem['attributes'].label ;
		}

		function makeReleaseDate(elem) {
		  return elem.label ;
		}
		function makeLink(elem) {
                return '<a href="'+elem['attributes']['href']+'">'+elem['attributes']['href']+'</a>';
		}
        //function makeButtonLink(elem) {
       // return '<button class="btn-lg" onclick="location.href=\''+elem['attributes']['href']+'\';">'+elem['label']+'</button>';
       // }
       function makeButtonLink(elem) {
       return '<button class="btn-buy" onclick="location.href=\''+elem['attributes']['href']+'\';">Buy!</button>';
       }

		function createRow(jsonElem) {
		  var html = '';
		  for (var p in columnObjects) {
		    var dat = jsonElem[p]; // sub item
		    switch (p) {
		      case 'im:name': 
		        html += '<td id="album" class="album">'+makeName(dat) + '</td>'; 
		        break;
		      case 'im:image': 
		        html += '<td class="image">'+makeImage(dat) + '</td>'; 
		        break;
		      case 'im:itemCount': 
		        html += '<td>'+makeItemCount(dat) + '</td>'; 
		        break;
				case 'im:price': 
		        html += '<td class="price"></td>'; 
		        break;
			  case 'im:contentType': 
		        html += '<td>'+makeContentType(dat) + '</td>'; 
		        break;
			  case 'rights': 
		        html += '<td>'+makeRights(dat) + '</td>'; 
		        break;
			  case 'title': 
		        html += '<td class="title">'+makeTitle(dat) + '</td>'; 
		        break;
			  case 'link': 
		        html += '<td class="link">'+makeButtonLink(dat) + '</td>'; 
		        break;
				


			  case 'im:artist': 
		        html += '<td class="artist">'+makeTitle(dat) + '</td>'; 
				break;
				case 'category': 
		        html += '<td class="category">'+makeCategory(dat) + '</td>'; 
		        break;
				case 'im:releaseDate': 
		        html += '<td>'+makeReleaseDate(dat) + '</td>'; 
		        break;
		    }
		  }
		  return html;
	  }
	
	function createHead() {
		var html = '';
		for (var o in columnObjects) {
		  html += '<th>'+columnObjects[o]+'</th>';
		}
		return '<thead>'+html+'</thead>';
	}
	
 $(document).ready(function() {
   var divContainer = $("#showData");
	    var dHtml = '';
	    var head = '';
	 divContainer.html('');
   $('<table class="1"></table>').appendTo(divContainer);	
	 $.getJSON("https://itunes.apple.com/us/rss/topalbums/limit=100/json", function (data) {

	    console.log(data);   	
      $.each(data.feed.entry, function (index, entry) {
            if (index<1) {
              head = createHead();
            }
         
		  dHtml += '<tr>'+createRow(entry)+'</tr>';
      });
		
		 divContainer.find('table').html(head+
										 '<tbody>'+dHtml+'</tbody>');
	 	
	 });
	 
 });