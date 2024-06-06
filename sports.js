const loadAllPlayers = (search) => {
    // fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${search}`)
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`)
    .then(res=>res.json())
    .then(data=>{displayPlayer(data.player)});
}
const displayPlayer = (players) => {
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = "";

    players?.forEach(player => {
        // console.log(player)
        const div = document.createElement("div");
        div.classList.add("cart");
        div.innerHTML = `
        <div class="card p-2" style="width: 18rem;">
        <img src="${player.strThumb? player.strThumb : "image doesn't exist"}" class="card-img-top" alt="profile-image">
        <div class="card-body">
          <h5 class="card-title">Name : ${player.strPlayer}</h5>
          <p class="card-text">Description : ${player?.strDescriptionEN?.slice(0,40)}</p>
          <h6>Weight : ${player?.strWeight}</h6>
          <h6>Team : ${player?.strTeam}</h6>
          <h6>Sport : ${player?.strSport}</h6>
          <h6>Salary : ${player?.strWage}</h6>
          <h6>Gender : ${player.strGender}</h6>
          <h6 class="mb-2">Nationality : ${player.strNationality}</h6>
          <h6 class="text-primary my-4">  <a class="fa-brands fa-facebook text-decoration-none me-3" target="_blank" href="https://${player?.strFacebook}"></a>   <a class="fa-brands fa-twitter text-decoration-none" target="_blank" href="https://${player?.strTwitter}"></a> </h6>
          <button onClick="handleAddToCart('${player?.strPlayer}')" class="btn btn-primary me-4">Add to group</button>
          <button data-bs-toggle="modal" data-bs-target="#playerDetailModal" onClick="singlePlayer('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
      </div>
        `
        playerContainer.appendChild(div);
    })
}


const searchPlayer = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadAllPlayers(searchText);
  searchField.value = "";
}


const handleAddToCart = (name) => {
  const cartCount = document.getElementById("count").innerText;
  let convert = parseInt(cartCount);
  convert += 1;
  if(convert > 11)
    {
      alert("You can't select more than 11 players");
      return;
    }
  document.getElementById("count").innerText = convert;
  const cartMainContainer = document.getElementById("cart-main-container");
  const div = document.createElement("div");
  div.classList.add("cart-info");
  div.innerHTML = `Name : ${name}`
  cartMainContainer.appendChild(div);
}

const singlePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
  .then(res => res.json())
  .then(data => playerDetails(data.players))
}

const playerDetails = (player) => {
  const player_detail = player[0];
  console.log(player[0].strPlayer)
  const playerTitle = document.getElementById("playerDetailModalLabel");
  playerTitle.innerText = player_detail.idPlayer;
  const playerDetails = document.getElementById("playerDetails");
  playerDetails.innerHTML = `
  <p>Born Date : ${player_detail.dateBorn ? player_detail.dateBorn : "born date doesn't exist"} </p>
  <p>Birth Location : ${player_detail.strBirthLocation? player_detail.strBirthLocation : "location doesn't exist"}</p>
   <p>Gender : ${player_detail.strGender?player_detail.strGender : "gender doesn't exist"}</p>
   <p>Height : ${player_detail?.strHeight?player_detail.strHeight : "height doesn't exist"}</p>
   <p>sport :  ${player_detail?.strSport?player_detail.strSport : "sport doesn't exist"}</p>
  `
}



loadAllPlayers("");