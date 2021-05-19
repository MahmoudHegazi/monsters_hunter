/* helper */
function arrayMin(arr) {
  var len = arr.length, min = Infinity;
  while (len--) {
    if (Number(arr[len]) < min) {
      min = Number(arr[len]);
    }
  }
  return min;
};

function arrayMax(arr) {
  var len = arr.length, max = -Infinity;
  while (len--) {
    if (Number(arr[len]) > max) {
      max = Number(arr[len]);
    }
  }
  return max;
};
/* helper end */
level_text


const champ = document.querySelector('#user_champ');
let cham_def_image = champ.src;
const text_level = document.querySelector('#level_text');
const rooms = document.querySelectorAll('.room');
const labels = document.querySelectorAll('.room_label');

/* monster stats */
const monsters_damge = [1,12, 24, 36, 48, 60,72, 84, 96, 108, 120, 550, 850]
const monsters_health = [1,12, 80, 260, 400, 500, 570, 650, 750, 850, 1000, 4000, 30000]

/* exp */
const monsters_exp =  [1, 10, 20, 30, 50, 80, 100, 110, 130, 150, 200, 350, 1500 ]

const user_levels_list = [1, 2, 3, 4, 5, 6 ,7, 8, 9, 10, 11, 12, 13]

const user_exp_needed = [1, 30, 60, 100, 170,220,250, 270, 350, 400, 600, 700, 1000]

/* user stats*/
const user_damge = [20, 60, 90, 120, 150, 220, 280, 360, 480, 580, 850, 1000]
const user_health = [78, 150,220, 440, 545, 650, 800, 1000, 1082, 5500, 10000]


const userobj = {
  exp: 0,
  damge_index: 0,
  health_index: 0,
  damge: user_damge[0],
  health: user_health[0],
  lvl: 1,
  lvlup: (order, lvl) => {
  
  
    /* if champ max level close*/
    
    let champexp =  champ.getAttribute('data-level');
    if (champ.getAttribute('data-level') == 12){
      return false;
    }
    
    
    if (champ.getAttribute('data-exp') >= user_exp_needed[userobj.lvl] || order==true){
      //alert('Check LVL up ');
         

    
    if (lvl != 1){
    userobj.lvl = (1 * lvl) ;
    userobj.damge_index += (1 * lvl) - 1;
    userobj.health_index += (1 * lvl) -1;
    } else if (lvl = 'auto') {
    
      /* handle auto lvl for more than 1 */
      
      let check_cexp =  champ.getAttribute('data-exp');
      
      for (var lvl=0; lvl<user_exp_needed.length; lvl++)
       {
         if (check_cexp < user_exp_needed[lvl]) {
           userobj.lvl = user_levels_list[lvl - 1];
           userobj.health_index = lvl - 1;
           userobj.damge_index = lvl - 1;
           //alert(user_levels_list[lvl - 1]);
           break;
         } 
      }
    } else {
    userobj.lvl += 1;
    userobj.damge_index += 1;
    userobj.health_index += 1;    
    }
    userobj.damge = user_damge[userobj.damge_index];
    userobj.health = user_health[userobj.health_index];
    text_level.textContent = userobj.lvl;
    champ.setAttribute('data-level', userobj.lvl);
    champ.setAttribute('data-damge', userobj.damge);
    champ.setAttribute('data-health', userobj.health);
    
    /* check if user lvled up or not */
    if (champexp < userobj.lvl) {
          let old_image = champ.src;
    champ.src = "https://raw.githubusercontent.com/MahmoudHegazi/monsters-hunter/main/jumb.webp";
    setTimeout(function(){ champ.src = cham_def_image;}, 1300);
     // LVL UP
    //alert('level up');
    return true;
    } else {
    // LVL NOT up 
    return false;
    }
     
       }
   
  },
  attack_calc: (event)=> {
    //alert(event.target.getAttribute('data-health'));
  },
  live_or_die: (monster) => {
  
    let current_health = Number(monster.getAttribute('data-health'));
    let champ_attack = Number(champ.getAttribute('data-damge'));
    let champ_exp = Number(champ.getAttribute('data-exp'));
    let champ_lvl = Number(champ.getAttribute('data-level'));
    let result = current_health - champ_attack;
    /* if champ still alive */
    if (result > 0) {
       // if champ live
       monster.setAttribute('data-health', Number(monster.getAttribute('data-health')) - champ_attack )
       return monster.getAttribute('data-health');
    } else {
    
      // if champ dead
      let monster_exp = Number(monster.getAttribute('data-exp'));
      let champ_exp = Number(champ.getAttribute('data-exp'));
      monster.setAttribute('data-health', 0);
      champ.setAttribute('data-exp',monster_exp + champ_exp);
      
      if (champ_exp >= user_exp_needed[userobj.lvl]) {
         //champ.setAttribute('data-level', champ_lvl+1); 
         
         /* here must be function upgrade according to exp*/
         userobj.lvlup(true, 'auto');
         //alert('hi');
         return 'dead';
         
      }
      return 'dead';
    }

  }
}

const heart = "https://i.pinimg.com/originals/98/d8/90/98d89049c0d6fcd6ff980635d53f383a.gif";


const items = [
'https://cliply.co/wp-content/uploads/2020/02/392002130_GEM_STONE_EMOJI_400px.gif', "https://i.gifer.com/origin/4c/4cf9c4b3173ec5a3ba877daed7c3309f_w200.gif",
"https://thumbs.gfycat.com/ObeseBothBaboon-size_restricted.gif",
"https://i.pinimg.com/originals/7b/51/f8/7b51f89ea40fbc46ed5eca47cad5efaa.gif"
]
const monster_images = [ "https://i.pinimg.com/originals/51/10/ab/5110ab924ec1d83549b2b99a49ac5e66.gif",
"https://thumbs.gfycat.com/OffensiveAnimatedLeafhopper-size_restricted.gif", "https://i.imgur.com/YxoIETK.gif","https://classroomclipart.com/images/gallery/Animations/big-eyed-purple-monster-animated-clipart-crcasm3.gif", "https://i.pinimg.com/originals/79/4a/d8/794ad85ec52e710511ac1581a401476a.gif","https://media1.giphy.com/media/jRr2Y37pHcYlRU8EZg/giphy.gif","https://lh3.googleusercontent.com/proxy/NARVwGsceMOPOSXaa6wz6Twt01Ubgi-Za-iCkarnriZLnEd9C7LMZNKJ_rGdlDT6sSl9IlOguq-YZEQg5KA0d_oycH0Dfg","https://static.wikia.nocookie.net/monster-legends-competitive/images/f/f5/Keeper_animation.gif/revision/latest?cb=20210321175116&path-prefix=fr","https://64.media.tumblr.com/f489f2492bd2641f8b8540ef57fb3f2d/tumblr_nq7ymstGxa1tgzy56o1_r2_540.gifv","https://static.wikia.nocookie.net/oto/images/1/10/Monster_Spicy_Dragon_Move.gif/revision/latest/scale-to-width-down/340?cb=20170424010510", "https://i.gifer.com/XqyS.gif","https://i.gifer.com/5e9d.gif"];

var levels_array = [7,4,12,3,2,5,8,10,1,6,11,9];


let check_monsters_levels = () => {
  level_list = [];
  document.querySelectorAll('.room_label').forEach( (lvl)=>{ level_list.push(lvl.textContent); });
  return level_list;
}


/* function to update champ data room */
function checkroom() {
  return champ.getAttribute('current-room');
  
}



  // function to create monster
  const single_monster = (room_number, parent, img, count, width, index) => {
    for (let i=0; i < count; i++){
    let new_monster = document.createElement('img');
    let current_room_num = room_number.split('_')[0].split('m')[1];
    let current_index = index;
    new_monster.src = img;
    new_monster.style.width = width;
    new_monster.className = "monster";
    new_monster.setAttribute('data-lvl', current_index);
    new_monster.setAttribute('data-health', monsters_health[index]);
    new_monster.setAttribute('data-damge', monsters_damge[index]);
    new_monster.setAttribute('data-exp', monsters_exp[index]);
    new_monster.setAttribute('data-room', room_number);
    new_monster.addEventListener('click', attack);
    parent.appendChild(new_monster);
    }
  }
  
  
const createmonsters = ()=> {
  
  var one_index = 0;
  var two_index = 0;
  var three_index = 0;
  let unique_index = [];
  var index = 1;

  
  rooms.forEach( (room, l)=> {
    

    const index = Math.floor(Math.random() * 11) + 1;

    let monster_count = Math.floor(Math.random() * 3) + 1;
    monster_image = monster_images[index];
    labels[l].textContent = index;
    

    
    /* indexing levels  not finished
    if (monster_count == 1) {
           

    }
    else if (monster_count == 2) {
       
    }
    else{
       unused line can break the code
    }
    */
    

    let room_number = room.getAttribute('data-room');
    
    
    /* create monster accodring to result */
    if (monster_count == 1) {
    single_monster(room_number, room, monster_image, monster_count, '50%', index);
    } 
    else if (monster_count == 2) {
    single_monster(room_number, room, monster_image, monster_count, '25%', index);
    } else {
    single_monster(room_number, room, monster_image, monster_count, '20%', index);
    }
 
    
  });
  
}
createmonsters();
let monster_levels = check_monsters_levels();
let minlevel = arrayMin(monster_levels);

let handle_firstlevel = (first)=> {

 if (first > 1) {
 let img_src = items[Math.floor(Math.random() * 3)+1];
 let new_image = document.createElement('img');
 document.getElementById("room13_champ").setAttribute('data-exp', first);
 new_image.src = img_src;
 new_image.style.width = "80%";
 new_image.style.height = "80%";
 new_image.style.marginLeft = "10%";
 new_image.setAttribute('data-room', 'item13');
 new_image.setAttribute('data-exp', first);
 new_image.id =  "item13";
 document.getElementById("room13_champ").appendChild(new_image);
  //champ.setAttribute('data-level', first);
 //text_level.textContent = first;
 
 }
}


handle_firstlevel(minlevel);
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}

function dragging(event) {
 // "The p element is being dragged";
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("Text");
  var room_id = event.target.getAttribute('data-room');
  var room_to = document.getElementById(room_id);
  champ.setAttribute('data-current-room', room_id);
  if (room_id == 'item13') {
     document.getElementById("item13").style.display = "none";
     let item_exp = document.getElementById("item13").getAttribute('data-exp');
     //alert(Number(item_exp)); Number(item_exp)
     userobj.lvlup(true, Number(item_exp));
     //champ.setAttribute('data-current-room', room_id);
     text_level.textContent = item_exp;
     document.getElementById("room13_champ").appendChild(document.getElementById(data));
     return;
     
  }
  room_to.appendChild(document.getElementById(data));
  // droped
}




// attack
function attack(event) {
  let champ_room = champ.getAttribute('data-current-room');
  let monster_room = event.target.getAttribute('data-room');
  
  /* HERE if champion not in the room can not attack this monster*/
  if (champ_room == monster_room){
    // alert('You can Attack');
     // store old src
     let old_src = champ.src;
     champ.src = "https://raw.githubusercontent.com/MahmoudHegazi/monsters-hunter/main/attack1.webp"
     
     /* show effect*/
     let get_effect = event.target.getAttribute('data-room') + '_ef';
     get_effect = document.getElementById(get_effect);
     
   
    
     
     check_monster = userobj.live_or_die(event.target);
     
     
     if (check_monster == 'dead') {
     // ATTack AREA
     let attack_data =  userobj.attack_calc(event);
      
     // kill monster
     event.target.classList.add('dead_monster');
     /*https://kylegrant76.files.wordpress.com/2016/01/explosion-1c200.gif*/

     setTimeout(function(){ event.target.remove(); get_effect.style.display = "none"; }, 200);
     
     setTimeout(function(){ champ.style.marginLeft = "20px"; }, 200);
     
     setTimeout(function(){ champ.style.marginLeft = "-20px"; 
     champ.src = old_src;
     
     }, 600);
     
     // then level up
     
     setTimeout(function(){ userobj.lvlup(true,1);}, 1200);
     
     } else {

       //alert("monster still live now health" + check_monster);
       setTimeout(function(){ champ.style.marginLeft = "20px"; }, 200);
       
       setTimeout(function(){ champ.src = cham_def_image; champ.style.marginLeft = "-20px";}, 500);
     }
          setTimeout(function(){ get_effect.style.display = "block";}, 200);
           setTimeout(function(){ get_effect.style.display = "none";}, 300);
     
     //champ.src = old_src;
     
     
     //setTimeout(function(){ champ.src = cham_def_image;}, 1300);
     
     //event.target.remove();
  } else {
    alert('You have no abilty to use magic attack enter the room');
  }
  

}
