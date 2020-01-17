/*! Copyright (c) 2013 Denys Petiukov. License: BSD 3-Clause. */

var kurosakiHTML5AudioPlayer = function(settings) {
    (function() {
        var pauseAllAudio = function() {
            var audioTag = document.querySelectorAll('audio'),
                audioLength = audioTag.length;
            for(var i=0; i<audioLength; i++) {
                audioTag[i].pause();
            }
        }
        if(typeof settings === 'undefined') {
            settings = {};
        }
        if(typeof settings.selector === 'undefined') {
            settings.selector = 'audio';
        }
        if(typeof settings.theme === 'undefined') {
            settings.theme = 'light';
        }
        if(typeof settings.width === 'undefined') {
            settings.width = '100%';
        }
        if(typeof settings.width === 'undefined') {
            settings.minWidth = '0';
        }
        if(typeof settings.maxWidth === 'undefined') {
            settings.maxWidth = '100%';
        }
        if(typeof settings.volumeControl === 'undefined') {
            settings.volumeControl = true;
        }
        if(typeof settings.seekBar === 'undefined') {
            settings.seekBar = true;
        }
        window.addEventListener('load', function(){
            var audioElement = document.querySelectorAll(settings.selector),
                length = audioElement.length,
                i,
                div,
                playerMarkup,
                playAudioButton;
            for(i=0; i<length; i++) {
                if(audioElement[i].parentNode.className.substring(0, 19) === 'kurosakiHTML5AudioPlayer') {
                    audioElement[i].parentNode.className = 'kurosakiHTML5AudioPlayer ' + settings.theme;
                    audioElement[i].parentNode.style.width = settings.width;
                    audioElement[i].parentNode.style.minWidth = settings.minWidth;
                    audioElement[i].parentNode.style.maxWidth = settings.maxWidth;
                    if(settings.volumeControl === false) {
                        audioElement[i].parentNode.className += ' noVolumeControl'
                    }
                    if(settings.seekBar === false) {
                        audioElement[i].parentNode.className += ' noSeekBar';
                    }
                } else if(audioElement[i].tagName === 'DIV') {
                    audioElement[i].className = 'kurosakiHTML5AudioPlayer ' + settings.theme;
                    audioElement[i].style.width = settings.width;
                    audioElement[i].style.minWidth = settings.minWidth;
                    audioElement[i].style.maxWidth = settings.maxWidth;
                    if(settings.volumeControl === false) {
                        audioElement[i].className += ' noVolumeControl'
                    }
                    if(settings.seekBar === false) {
                        audioElement[i].className += ' noSeekBar';
                    }
                } else {
                    div = document.createElement('div');
                    div.className = 'kurosakiHTML5AudioPlayer ' + settings.theme;
                    audioElement[i].removeAttribute('controls');
                    audioElement[i].parentNode.insertBefore(div, audioElement[i]);
                    div.appendChild(audioElement[i]);
                    div.innerHTML += '<a class=\"playAudio\" href=\"#\">Play<\/a><div class=\"progressBarWrapOperaFix\"><div class=\"progressBarWrap\"><div class=\"progressBar\"><\/div><\/div><\/div><div class=\"playerMiddleBorder\"><\/div><a class=\"mute\" href=\"#\">Mute<\/a><div class=\"soundBarWrap\"><div class=\"soundBar\"><\/div><\/div><div class=\"playerRightBorder\"><\/div>';
                    div.style.width = settings.width;
                    div.style.minWidth = settings.minWidth;
                    div.style.maxWidth = settings.maxWidth;
                    if(settings.volumeControl === false) {
                        div.className += ' noVolumeControl'
                    }
                    if(settings.seekBar === false) {
                        div.className += ' noSeekBar';
                    }
                }
            }
            var audioPlayer = document.querySelectorAll('.kurosakiHTML5AudioPlayer'),
                playAudioButton = document.querySelectorAll('.playAudio'),
                l = audioPlayer.length,
                interval,
                progressMouseMove,
                soundMouseMove,
                documentMouseUp;
            for(i=0;i<l;i++) {
                audioPlayer[i].onmousedown = function(e){
                    e.preventDefault();
                    var audio = this.querySelector('audio'),
                        playAudio = this.querySelector('.playAudio'),
                        progressBarWrap = this.querySelector('.progressBarWrap'),
                        progressBar = this.querySelector('.progressBar'),
                        mute = this.querySelector('.mute'),
                        soundBarWrap = this.querySelector('.soundBarWrap'),
                        soundBar = this.querySelector('.soundBar'),
                        progressBarOffset = progressBar.getBoundingClientRect(),
                        soundBarOffset = soundBar.getBoundingClientRect();
                    if(e.target === playAudio) {
                        if(audio.ended) {
                            progressBar.style.width = '0%';
                        }
                        if(audio.paused || audio.ended) {
                            pauseAllAudio();
                            clearInterval(interval);
                            for(i=0; i<playAudioButton.length; i++) {
                                playAudioButton[i].className = 'playAudio';
                            }
                            audio.play();
                            playAudio.innerHTML = 'Pause';
                            playAudio.className = playAudio.className.replace(' paused', '') + ' playing';
                            interval = setInterval(function(){
                                progressBar.style.width = 100/audio.duration*audio.currentTime + '%';
                                if(audio.ended) {
                                    clearInterval(interval);
                                    playAudio.innerHTML = 'Play';
                                    playAudio.className = playAudio.className.replace(' playing', '') + ' paused';
                                }
                            }, 500);
                        } else {
                            audio.pause();
                            playAudio.innerHTML = 'Play';
                            playAudio.className = playAudio.className.replace(' playing', '') + ' paused';
                            clearInterval(interval);
                        }
                    }
                    else if(e.target === progressBarWrap || e.target === progressBar) {
                        clearInterval(interval);
                        progressBar.style.width = 100/progressBarWrap.offsetWidth*(e.clientX-progressBarOffset.left) + '%';
                        progressMouseMove = function(e) {
                            progressBar.style.width = 100/progressBarWrap.offsetWidth*(e.clientX-progressBarOffset.left) + '%';
                            if(e.clientX-progressBarOffset.left < 0) {
                                progressBar.style.width = '0%';
                            }
                        }
                        documentMouseUp = function(e) {
                            document.removeEventListener('mousemove', progressMouseMove, false);
                            audio.currentTime = audio.duration/100*parseFloat(progressBar.style.width);
                            if(audio.paused === false) {
                                interval = setInterval(function(){
                                    progressBar.style.width = 100/audio.duration*audio.currentTime + '%';
                                    if(audio.ended) {
                                        clearInterval(interval);
                                        playAudio.innerHTML = 'Play';
                                        playAudio.className = playAudio.className.replace(' playing', '') + ' paused';
                                    }
                                }, 500);
                            }
                            document.removeEventListener('mouseup', documentMouseUp, false);
                        }
                        document.addEventListener('mousemove', progressMouseMove, false);
                        document.addEventListener('mouseup', documentMouseUp, false);
                    }
                    else if(e.target === mute) {
                        if(audio.muted) {
                            audio.muted = false;
                            mute.innerHTML = 'Mute';
                            mute.className = mute.className.replace(' muted', '') + ' unmuted';
                            soundBar.style.width = 100*audio.volume + '%';
                        } else {
                            audio.muted = true;
                            mute.innerHTML = 'Unmute';
                            mute.className = mute.className.replace(' unmuted', '') + ' muted';
                            soundBar.style.width = '0%';
                        }
                        if(audio.volume === 0) {
                            audio.volume = 0.3;
                            soundBar.style.width = 100*audio.volume + '%';
                        }
                        if(parseInt(soundBar.style.width) <= 50 && parseInt(soundBar.style.width) > 0) {
                            mute.className = mute.className.replace(' halfVolume', '') + ' halfVolume';
                        }
                        else {
                            mute.className = mute.className.replace(' halfVolume', '');
                        }
                    }
                    else if(e.target === soundBarWrap || e.target === soundBar) {
                        soundBar.style.width = 100/soundBarWrap.offsetWidth*(e.clientX-soundBarOffset.left) + '%';
                        audio.volume = 1/100*parseFloat(soundBar.style.width);
                        soundMouseMove = function(e) {
                            soundBar.style.width = 100/soundBarWrap.offsetWidth*(e.clientX-soundBarOffset.left) + '%';
                            if(e.clientX-soundBarOffset.left < 0) {
                                soundBar.style.width = '0%';
                            }
                            if(parseFloat(soundBar.style.width) <= 100) {
                                audio.volume = 1/100*parseFloat(soundBar.style.width);
                            }
                            if(audio.volume>0) {
                                audio.muted = false;
                                mute.innerHTML = 'Mute';
                                mute.className = mute.className.replace(' muted', '').replace(' unmuted', '') + ' unmuted';
                            } else {
                                audio.muted = true;
                                mute.innerHTML = 'Unmute';
                                mute.className = mute.className.replace(' unmuted', '').replace(' muted', '') + ' muted';
                            }
                            if(parseInt(soundBar.style.width) <= 50 && parseInt(soundBar.style.width) > 0) {
                                mute.className = mute.className.replace(' halfVolume', '') + ' halfVolume';
                            }
                            else {
                                mute.className = mute.className.replace(' halfVolume', '');
                            }
                        }
                        documentMouseUp = function(e) {
                            document.removeEventListener('mousemove', soundMouseMove, false);
                            document.removeEventListener('mouseup', documentMouseUp, false);
                        }
                        document.addEventListener('mousemove', soundMouseMove, false);
                        document.addEventListener('mouseup', documentMouseUp, false);
                        if(audio.volume>0) {
                            audio.muted = false;
                            mute.innerHTML = 'Mute';
                            mute.className = mute.className.replace(' muted', '').replace(' unmuted', '') + ' unmuted';
                        } else {
                            audio.muted = true;
                            mute.innerHTML = 'Unmute';
                            mute.className = mute.className.replace(' unmuted', '').replace(' muted', '') + ' muted';
                        }
                        if(parseInt(soundBar.style.width) <= 50 && parseInt(soundBar.style.width) > 0) {
                            mute.className = mute.className.replace(' halfVolume', '') + ' halfVolume';
                        }
                        else if(parseInt(soundBar.style.width) > 50) {
                            mute.className = mute.className.replace(' halfVolume', '');
                        }
                    }
                }
                audioPlayer[i].addEventListener('click', function(e){e.preventDefault()}, false);
                if(audioPlayer[i].querySelector('audio').autoplay) {
                    var audio = audioPlayer[i].querySelector('audio');
                    var playAudio = audioPlayer[i].querySelector('.playAudio');
                    var progressBar = audioPlayer[i].querySelector('.progressBar');
                    playAudio.innerHTML = 'Pause';
                    playAudio.className = 'playAudio playing';
                    if(kurosakiFirstTime === true) {
                        interval = setInterval(function(){
                            progressBar.style.width = 100/audio.duration*audio.currentTime + '%';
                            if(audio.ended || audio.paused) {
                                clearInterval(interval);
                                playAudio.innerHTML = 'Play';
                                playAudio.className = 'playAudio paused';
                            }
                        }, 500);
                        kurosakiFirstTime = false;
                    }
                }
            }
        }, false);
    }());
}, kurosakiFirstTime = true;