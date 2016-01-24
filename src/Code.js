function copyDocs(docId, numCopies) {

  if(!docId){
    docId = DocumentApp.getActiveDocument().getId();
  }
  if(!numCopies || numCopies <1){
    numCopies =5;
  }
  for(i=0; i<numCopies; i++){  
    
    var file=DriveApp.getFileById(docId);
    var name = file.getName();
    var folders = file.getParents();
    var folder = folders.next();
    Logger.log(folder.getName());
    
    file.makeCopy(((i+1)+" - "+name), folder);
  
  }
}

function makeCopies(docId,numCopies) {
  copyDocs(docId,numCopies);
  return true;
  
}

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  
  
  DocumentApp.getUi().createAddonMenu()
      .addItem('Open Copy Documents', 'showSidebar'  )
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}


/**
 * Opens a sidebar in the document containing the add-on's user interface.
 */
function showSidebar() {
  //var ui = HtmlService.createHtmlOutputFromFile('Sidebar').setTitle('JoeZoo Express');
  var ui = HtmlService.createTemplateFromFile("Sidebar").evaluate().setTitle("Make Copies of Documents").setSandboxMode(HtmlService.SandboxMode.IFRAME);
  DocumentApp.getUi().showSidebar(ui);
}