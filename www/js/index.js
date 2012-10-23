var scroller;
var timeouts = {};
var effectsMap = {};
var lastClick = 0;
var touchMap= {};

var MAX_TAP_TIME = 500;
var MAX_TAP_FLOAT = 8;

var MIN_ANDROID_SOUND_LIMITING = 2;
var MAX_ANDROID_CONCURRENT_SOUNDS = 4;

var view = "";

var sounds = {
    ambient:[
        {id:'thunderstorm', label:"Thunder", path:'assets/processed/23222__erdie__thunderstorm2_01.mp3', playing:false },
        {id:'tensionscape', label:"Tension", path:'assets/processed/38964__argitoth__archi-soundscape-horror1_01.mp3', playing:false },
        {id:'hellscape', label:"Hellscape", path:'assets/processed/126323__klankbeeld__horror-zombie-hell-atmos_01.mp3', playing:false },
        {id:'heartbeat', label:"Heartbeat", path:'assets/processed/108247__buginthesys__heartbeat_01.mp3', playing:false },
        {id:'rain', label:"Rain", path:'assets/processed/7176__mystiscool__rain_01.mp3', playing:false },
        {id:'piano', label:"Haunted Piano", path:'assets/processed/149300__setuniman__worry-0k-30mi2_01.mp3', playing:false },
        {id:'forest', label:"Haunted Forest", path:'assets/processed/70100__gregswinford__eerie-forest_01.mp3', playing:false }
    ],
    effects:[

        {id:'laugh1', label:"Evil Laughter", path:'assets/processed/26729__leady__insane-laughter-man-reverb_01.mp3', duration:12000, playing:false },
        {id:'laugh2', label:"Demonic Laughter", path:'assets/processed/76455__str4ngs__monster-insane-laugh_01.mp3', duration:36000, playing:false },
        {id:'witch', label:"Witch Cackle", path:'assets/processed/84746__robinhood76__01385-witch-cackle-3-natural_01.mp3', duration:5000, playing:false },
        {id:'monster1', label:"Monster Roar", path:'assets/processed/48662__sea-fury__monster_01.mp3', duration:6000, playing:false },
        {id:'monster2', label:"Demon's Breath", path:'assets/processed/48688__sea-fury__monster-4_01.mp3', duration:4000, playing:false },
        {id:'monster3', label:"Zombie Belch", path:'assets/processed/66494__robinhood76__00831-monster-in-face-3_01.mp3', duration:2000, playing:false },
        {id:'ghost1', label:"Ghost Moan", path:'assets/processed/97311__robinhood76__01707-scary-ghost-moan_01.mp3', duration:7000, playing:false },
        {id:'ghost2', label:"Poltergeist", path:'assets/processed/66642__robinhood76__00861-dragons-breath_01.mp3', duration:7000, playing:false },
        {id:'ghost3', label:"Death Squeal", path:'assets/processed/103332__flasher21__scream_01.mp3', duration:8000, playing:false },
        {id:'crow', label:"Crows Caw", path:'assets/processed/52450__inchadney__craw_01.mp3', duration:3000, playing:false },
        {id:'owl', label:"Owl Hoot", path:'assets/processed/20684__johnc__owl_01.mp3', duration:3000, playing:false },
        {id:'wolf1', label:"Wolf Howl", path:'assets/processed/66398__robinhood76__00829-wolf-howl-one-shot_01.mp3', duration:5000, playing:false },
        {id:'wolf2', label:"Wolves Prowling", path:'assets/processed/76456__gorgoroth6669__wolf-howl_01.mp3', duration:28000, playing:false },
        {id:'maleScream', label:"Man Scream", path:'assets/processed/9432__thanvannispen__male-thijs-loud-scream_01.mp3', duration:3000, playing:false },
        {id:'femaleScream', label:"Woman Scream", path:'assets/processed/35716__analogchill__scream_01.mp3', duration:3500, playing:false },
        {id:'womenScream', label:"Group Scream", path:'assets/processed/30279__thanvannispen__scream-group-women_01.mp3', duration:4500, playing:false }
    ]
};


function onDeviceReady()
{
	document.addEventListener("pause", onAppPause, false);

	var android = navigator.userAgent.search( "Android" ) >= 0;
	
    var voices = (android ? 2 : 3);
    if ( android && device.version.search( "2." ) == 0 ){
    	voices = 1;
    }
    

    //preload multi-voiced effect assets
    for ( var x=0; x < sounds.effects.length; x++ ) {
        var sound = sounds.effects[x];
        effectsMap[ sound.id ] = sound;
        if ( sound.duration > 15000 || !android ) {
        	LowLatencyAudio.preloadAudio( sound.id, sound.path, voices );
        }
        else {
        	LowLatencyAudio.preloadFX( sound.id, sound.path );
        }
        
    }
    
    //preload single voiced ambient assets
    for ( var x=0; x < sounds.ambient.length; x++ ) {
        var sound = sounds.ambient[x];
        effectsMap[ sound.id ] = sound;
        LowLatencyAudio.preloadAudio( sound.id, sound.path, 1 );
    }
    
    
    //allow time for sounds to load - yeah, i know, i should add callbacks
    setTimeout( renderMain, 3000 );
}

function resetScroller() {

    if ( !scroller ) {
        scroller = new iScroll('wrapper', {hScroll:false});
    }
    scroller._pos(0,0);
    scroller.refresh();
}


function setupTapHandlers( target, handler ) {
    var id = target.attr("id");
    touchMap[ id ] = {
    		handler:handler
    }

	target.bind( "touchstart", touchStart );
	target.bind( "touchmove", touchMove );
	target.bind( "touchend", touchEnd );
}

function touchStart( event ) {
	var element = $(event.target);
    var id = element.attr("id");
	touchMap[ id ].startTime = new Date().getTime();
	
	var touchItem = event.targetTouches[0];
	touchMap[ id ].startX = touchItem.pageX;
	touchMap[ id ].startY = touchItem.pageY;
	touchMap[ id ].endX = touchItem.pageX;
	touchMap[ id ].endY = touchItem.pageY;
}

function touchMove( event ) {
	var element = $(event.target);
    var id = element.attr("id");
    var touchInfo = touchMap[ id ];
	
	var touchItem = event.targetTouches[0];
	touchMap[ id ].endX = touchItem.pageX;
	touchMap[ id ].endY = touchItem.pageY;
}

function touchEnd( event ) {
	var element = $(event.target);
    var id = element.attr("id");
    var touchInfo = touchMap[ id ];
	var now = new Date().getTime();
	
	if ( now - touchMap[ id ].startTime < MAX_TAP_TIME ) {

		if ( event.targetTouches.length > 0 ) {
			var touchItem = event.targetTouches[0];
			touchMap[ id ].endX = touchItem.pageX;
			touchMap[ id ].endY = touchItem.pageY;
		}
		
		var diffX = Math.abs( touchMap[ id ].startX - touchMap[ id ].endX );
		var diffY = Math.abs( touchMap[ id ].startY - touchMap[ id ].endY );
		
		//alert(diffX + ", " +diffY)
		if ( diffX <= MAX_TAP_FLOAT && diffY <= MAX_TAP_FLOAT ) {
			touchInfo.handler( event );
		}
		
	}
}

function renderMain() {
	document.removeEventListener("backbutton", onBackButton);
	view = "main";

    var template = $("#mainViewTemplate").html();
    var body = $("#body");
    body.css( "display", "none" );
    $("#body").html( Mustache.render(template, sounds) );

    $("#ambientSounds div").each(function(index) {
        setupTapHandlers( $(this), ambientAssetTap );
    });
    $("#soundEffects div").each(function(index) {
        setupTapHandlers( $(this), soundFxAssetTap );
    });
    $("#soundEffects div .stop").each(function(index) {
        setupTapHandlers( $(this), soundFxAssetStop );
    });

    setupTapHandlers( $("#aboutButton"), renderAbout );

    resetScroller();
    updateCSS();
    body.css( "display", "block" );
}

function renderAbout() {
	view = "about";
	
    var template = $("#aboutViewTemplate").html();
    var body = $("#body");
    body.css( "display", "none" );
    $("#body").html( Mustache.render(template, sounds) );

    setupTapHandlers( $("#back"), renderMain );

    $("a").click( handleLink );
    resetScroller();
    body.css( "display", "block" );
    setTimeout( function(){ resetScroller() }, 200 );
	document.addEventListener("backbutton", onBackButton, false);
}

function acceptClick() {
	var now = new Date().getTime();
	var result = false
	if (now-lastClick > 500){
		result = true;
	}
	lastClick = now;
	console.log(result)
	return result;
}

function handleLink(event){

    event.preventDefault();
    if (event.stopImmediatePropagation) {
    	event.stopImmediatePropagation();
    }
    else {
    	event.stopPropagation();
    }
    
	if( !acceptClick() ){ return false; };

    var element = $(event.target)
    var href = element.attr("href");

    NativeUtil.openExternalURL(href);

    return false;
}

function ambientAssetTap(event) {
	
    var element = $(event.target)
    var id = element.attr("id");
    var asset = effectsMap[ id ];

    if ( element.hasClass("active") ) {
        element.removeClass("active");
        asset.playing = false;
        LowLatencyAudio.stop( id );
    }
    else {

    	if (!canPlayAmbientAsset()){ 
    		navigator.notification.alert("Cannot play more than " + MAX_ANDROID_CONCURRENT_SOUNDS + " ambient sounds at the same time.  Please stop an ambient sound to play another one.", null, "Warning", "OK")
    		return false; 
    	}
    	
        element.addClass("active");
        asset.playing = true;
        LowLatencyAudio.loop( id );
    }
}

function canPlayAmbientAsset() {
	var android = navigator.userAgent.search( "Android" ) >= 0;
	var version = parseInt( device.version );
	var playing = 0;
	
	if ( android && version <= MIN_ANDROID_SOUND_LIMITING) {
		
		for ( var x=0; x < sounds.ambient.length; x++ ) {
	        var sound = sounds.ambient[x]; 
	        if ( sound.playing ) {
	        	playing++;
	        }
	    }
		
	}	
	
	return (playing < MAX_ANDROID_CONCURRENT_SOUNDS);
}

function soundFxAssetTap(event) {
	
    var element = $(event.target)
    var id = element.attr("id");
    var asset = effectsMap[ id ];

    if ( !element.hasClass("active") ) {
        element.addClass("active");
    }
    updateAssetHighlight( id );
    asset.playing = true;
    LowLatencyAudio.play( id );
    return true;
}

function updateAssetHighlight( id ) {
	if ( effectsMap[id] != undefined ) {
	    clearTimeout( timeouts[id] );
	    timeouts[id] = setTimeout( function() {
	        var asset = effectsMap[ id ];
	        asset.playing = false;
	        $("#"+id).removeClass("active");
	    }, effectsMap[id].duration );
	}
}

function soundFxAssetStop(event) {
	
    var element = $(event.target)
    var id = element.attr("id").substr(5);
    var asset = effectsMap[ id ];

    $("#"+id).removeClass("active");
    clearTimeout( timeouts[id] );
    asset.playing = false;
    LowLatencyAudio.stop( id );

    event.preventDefault();
    if (event.stopImmediatePropagation) {
    	event.stopImmediatePropagation();
    }
    else {
    	event.stopPropagation();
    }
    return false;
}

function updateCSS() {
    var ss = document.styleSheets;
    var width = $(window).width();
    
    for (var i=0; i<ss.length; i++) {
        var rules = ss[i].cssRules || ss[i].rules;

        for (var j=0; j<rules.length; j++) {
            if (rules[j].selectorText === ".cell") {
            	
            	if ( width < 700 ) {
            		rules[j].style[ "width" ] = "100%";
            		rules[j].style[ "max-width" ] = (width-40) + "px";
            	}
            	else if (width < 1000) {
            		rules[j].style[ "width" ] = "50%";
            		rules[j].style[ "max-width" ] = Math.floor((width-60)/2) + "px";
            	}
            	else {
            		rules[j].style[ "width" ] = "33.3%";
            		rules[j].style[ "max-width" ] = Math.floor((width-80)/3) + "px";
            	}
            	break;
            }
        }
    }
    setTimeout( function(){ resetScroller() }, 200 );
}

function onAppPause() {
	var android = navigator.userAgent.search( "Android" ) >= 0;
	if ( android ) {
		for ( var x=0; x < sounds.ambient.length; x++ ) {
		    var sound = sounds.ambient[x]; 
		    LowLatencyAudio.stop( sound.id );
		    $("#"+sound.id).removeClass("active");
		    clearTimeout( timeouts[sound.id] );
		    sound.playing = false;
		}
		
		for ( var x=0; x < sounds.effects.length; x++ ) {
		    var sound = sounds.effects[x];
			LowLatencyAudio.stop( sound.id );
		    $("#"+sound.id).removeClass("active");
		    clearTimeout( timeouts[sound.id] );
		    sound.playing = false;
		}
	}
}

function onBackButton( event ) {
	if ( view == "about") {
		renderMain();
	}
}

$(window).resize( updateCSS );
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);