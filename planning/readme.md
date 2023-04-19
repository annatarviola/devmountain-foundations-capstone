myStrings: Viola

MVP FEATURES (5 pts):

* Users can enter information about new sets of strings (front end is interactive, 5 pts)
* Users can save the info about the strings and have them display (front end makes a request to the server and handles the response, 5 pts)
* User can edit and delete past sets of strings

Front End: 
* Semantic tags (5 pts): 
   - <header> 
   - <main> 
   - <form> (for "Add New Set")
   - <section> (for "My Strings")
   - <details> (to show and hide "My Strings" cards)
* Views (5 pts):
   - Homepage (styling will be responsive, 5 pts)
   - "My Strings" potentially on another page?
* Styling: Strings cards custom styled (5 pts) and displayed using flexbox (5 pts) 

Server:
* GET: getAllSets function, displays all sets of strings saved (5 pts)
* POST: addSet function, submitted through the form to add a new set of strings (5 pts)
* PUT: updateSet function, update info on any set of strings (5 pts)
* DELETE: deleteSet function, delete a set of strings (5 pts)
* Use controller file to keep functions neat (5 pts)

List of MVP Features (5 pts)
Wireframe (5 pts)
Presentation (discusses purpose and demonstrates MVP, between 2-3 min, 10 pts)

////////////
TO CODE:

* "Add New Set" button will add a new object to an array to describe a set of strings, sent in through a form
   
   { 
     brand: string (REQUIRED)
     imgURL: string 
     date: string ? (REQUIRED)
     tension: string 
     strings: string (lol)
     toneQuality: integer
     projection: integer
     rating: integer
     userNotes: string
   }

   - Make sure that form won't submit until string brand name and date are put in
   - Build out a slider for tone quality (warmth <-> brilliance)
   
* After new set is added, a card will be created and displayed for the new set of strings in the "My Strings" section
   - Build card in inner HTML
   - Populate with form submissions (axios)
   - Add to section
   - "Update Set Info" button -> updateSet function to change any info
   - "Delete Set" button -> deleteSet to delete a set card

* Possibly adding slider later: 
   <div class="form-group">
            <datalist id="warmth-brilliance">
              <option value="0" label="Warm"></option>
              <option value="20" label="Brilliant"></option>
            </datalist>
            <input type="range" max="20" name="toneQuality" class="slider"/>
          </div>