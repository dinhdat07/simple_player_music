const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randBtn = $('.btn-random')
const repBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {
    currentIndex: 0,
    isPlaying: 0,
    isRandom: 0,
    isRepeat: 0,
    songs: [
        {
            name: 'Hollywood\'s Bleeding',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-1.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'Saint-Tropez',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-2.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'Enemies',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-3.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'Allergic',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-4.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'A Thousand Bad Times',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-5.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
                {
            name: 'Circles',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-6.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'Die For Me',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-7.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'On The Road',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-8.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'Take What You Want',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-9.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
        {
            name: 'I\'m Gonna Be',
            singer: 'Post Malone',
            path: './assets/post-malone-hb-10.mp3',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/58/Post_Malone_-_Hollywood%27s_Bleeding.png'
        },
    ],
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        }) 
    },
    render: function () {
        const htmls = this.songs.map((song, id) => {
            return `
            <div class="song ${id === this.currentIndex ? 'active' : ''}" data-index="${id}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
          `
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) this.currentIndex = 0
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
        this.loadCurrentSong()
    },
    randomSong: function () {
        this.isRandom = !this.isRandom;
        if (this.isRepeat && this.isRandom) this.repeatSong();
        randBtn.classList.toggle('active', this.isRandom)
    },
    repeatSong: function () {
        this.isRepeat = !this.isRepeat
        if (this.isRepeat && this.isRandom) this.randomSong();
        repBtn.classList.toggle('active', this.isRepeat)
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
        this.render();
        this.scrollToActiveSong();
    },
    playNextSong: function () {
        if (this.isRandom) {
            this.playRandomSong();
        } else if (!this.isRepeat) {
            nextBtn.click();
        }
    }, scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        }, 300)
    },
    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth

        const cdThumbAnimate = cdThumb.animate(
            [{ transform: 'rotate(360deg)' }],
            { duration: 10000, iterations: Infinity }
        )
        cdThumbAnimate.pause();
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = (newCdWidth > 0 ? newCdWidth + 'px' : 0)
            cd.style.opacity = newCdWidth / cdWidth
        }
        
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        
        nextBtn.onclick = function () {
            _this.nextSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        prevBtn.onclick = function () {
            _this.prevSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        randBtn.onclick = function () {
            _this.randomSong();
        }
        repBtn.onclick = function () {
            _this.repeatSong();
        }

        audio.onplay = function () {
            _this.isPlaying = 1;
            player.classList.add("playing");
            cdThumbAnimate.play();
        }

        audio.onpause = function () {
            _this.isPlaying = 0;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        }

        audio.ontimeupdate = function () {
            if (audio.duration) {
                progress.value = Math.floor(audio.currentTime / audio.duration * 100)
            }
        }

        audio.onended = function () {
            _this.playNextSong()
        }

        progress.onchange = function (e) {
            audio.currentTime = audio.duration * e.target.value / 100;
        }

        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            const optionNode = e.target.closest('.option')
            if (optionNode) {
                
            } else if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }

    },
    start: function () {
        this.defineProperties();
        this.handleEvents();
        this.loadCurrentSong();
        this.render();
    }
}


app.start();