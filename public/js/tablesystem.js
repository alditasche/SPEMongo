function save(){
    var status = document.getElementsByName("status");
    status.forEach(element=>{
        switch(element.value){
            case "In Bearbeitung":
                  $.post("/users/change2inprogress",
                  {
                    id: element.id
                  });
            break;
            case "Abgebrochen":
            $.post("/users/change2cancel",
            {
              id: element.id,
              origin: "salesproposals"
            });
            break;
            default:
            break;
        }
    });
    var inprogressstatus = document.getElementsByName("InProgresStatus");
    inprogressstatus.forEach(element=>{
        switch(element.value){
            case "In Bearbeitung":               
            break;
            case "Abgebrochen":
            $.post("/users/change2cancel",
            {
              id: element.id,
              origin: "salesinprogress"
            });
            break;
            case "Verkauft":
            $.post("/users/change2sold",
            {
              id: element.id
            });
            break;
            default:
            break;
        }
    });

}
