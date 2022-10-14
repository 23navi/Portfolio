new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [


        
        {
          name: "Like me better ",
          artist: "Lauv",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742209/portfolio/myMusic/music%20pics%20/like_me_better_ocd2ih.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742359/portfolio/myMusic/songs/Y2Mate.is_-_Lauv_-_I_Like_Me_Better_Official_Video_-BcqxLCWn-CE-128k-1655839237934_v2nod6.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },


        //last part to be cut
        {
          name: "Duniya ",
          artist: "Akhil",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742343/portfolio/myMusic/songs/Y2Mate.is_-_Luka_Chuppi_Duniyaa_Full_Video_Song_Kartik_Aaryan_Kriti_Sanon_Akhil_Dhvani_B-hVCYwwFwGEE-128k-1655844323955_tns5vk.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },

        {
          name: "Without you - Disc ",
          artist: "Akhil",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742513/portfolio/myMusic/songs/Y2Mate.is_-_Discrete_-_WITHOUT_YOU._Lyrics_ft._Mary_Cicilia-VHoNccUj5sY-128k-1655844124468_hjos8z.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },


        {
          name: "Make you mine",
          artist: "Public",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742498/portfolio/myMusic/songs/Y2Mate.is_-_PUBLIC_-_Make_You_Mine_Put_Your_Hand_in_Mine_Official_Video_-nLnp0tpZ0ok-160k-1655822605707_dwhpkh.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },


        {
          name: "Let me down slowly",
          artist: "Alec_Benjamin",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742482/portfolio/myMusic/songs/Y2Mate.is_-_Alec_Benjamin_-_Let_Me_Down_Slowly_Official_Music_Video_-50VNCymT-Cs-128k-1655823038485_yydwpa.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },



        {
          name: "Dance monkey ",
          artist: "Tones and I",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742478/portfolio/myMusic/songs/Y2Mate.is_-_Tones_and_I_-_Dance_Monkey-p_-SscksAf4-128k-1655844809214_jmcfqm.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },



        {
          name: "Without you",
          artist: "The Kid LAROI",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742460/portfolio/myMusic/songs/Y2Mate.is_-_The_Kid_LAROI_-_WITHOUT_YOU_Official_Video_-SJOKlqJho8U-128k-1655843172054_ygsji4.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },



        {
          name: "Stay",
          artist: "Justin Bieber",
          cover: "https://res.cloudinary.com/drfaohzpo/image/upload/v1665742194/portfolio/myMusic/music%20pics%20/akhil_duniya_augg9e.png",
          source: "https://res.cloudinary.com/drfaohzpo/video/upload/v1665742458/portfolio/myMusic/songs/Y2Mate.is_-_The_Kid_LAROI_Justin_Bieber_-_STAY_Official_Video_-kTJczUoc26U-128k-1655841551421_hzhbhv.mp3",
          url: "https://youtu.be/BcqxLCWn-CE",
          favorited: false
        },
       
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },


    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },


    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      this.play()
    },



    shuffleTrack(){
      this.transitionName = "scale-out";
      this.isShowCover = false;
      this.currentTrackIndex=Math.floor(Math.random()*this.tracks.length);
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      this.play()
    },


    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
      this.play()

    },


    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 500);
    },



    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },



  
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
