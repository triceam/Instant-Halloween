Instant-Halloween
=================

Instant Halloween is a free and open source Halloween-themed sound effects application built using PhoneGap.  This app was developed using PhoneGap version 2.1.0.

## Setup Instructions:

### iOS

1. Create a new PhoneGap project following the instructions in the [iOS Getting Started Guide](http://docs.phonegap.com/en/2.1.0/guide_getting-started_ios_index.md.html#Getting%20Started%20with%20iOS)
2. Copy the contents of the "www" directory from this repository into the "www" directory in the new project (do not overwrite the cordova-2.1.0.js).
3. Copy the files in the "native plugin/iOS" directory into your iOS project and make sure that they have been added within Xcode (not just copied into the directory).  You can read more about PhoneGap Native Plugins in the [PhoneGap Docs](http://docs.phonegap.com/en/2.1.0/guide_plugin-development_index.md.html#Plugin%20Development%20Guide).  The plugin used here is the [LowLatencyAudio Plugin for iOS](https://github.com/phonegap/phonegap-plugins/tree/master/iOS/LowLatencyAudio)
4. Add a mapping in Cordova.plist under "Plugins".  Map the key "LowLatencyAudio" to the value "LowLatencyAudio"

### Android

1. Create a new PhoneGap project following the instructions in the [Android Getting Started Guide](http://docs.phonegap.com/en/2.1.0/guide_getting-started_android_index.md.html#Getting%20Started%20with%20Android)
2. Copy the contents of the "www" directory from this repository into the "www" directory in the new project (do not overwrite the cordova-2.1.0.js).
3. Copy the files in the "native plugin/Android" directory into your Android project (into the "src" folder).  You can read more about PhoneGap Native Plugins in the [PhoneGap Docs](http://docs.phonegap.com/en/2.1.0/guide_plugin-development_index.md.html#Plugin%20Development%20Guide).  The plugin used here is the [LowLatencyAudio Plugin for Android](https://github.com/phonegap/phonegap-plugins/tree/master/Android/LowLatencyAudio)
4. Add a mapping in Cordova.plist under "Plugins".  Map the key "LowLatencyAudio" to the value "LowLatencyAudio"

## Code

This application is rendered dynamically using JavaScript.  See www/index.html to see general structure and HTML template.  See www/js/index.js for general application logic and interactivity.

###Libraries
The following libraries were used within this application:

* [Zepto](http://zeptojs.com/)
* [iScroll](http://cubiq.org/iscroll)
* [MustacheJS](https://github.com/janl/mustache.js)

## Attribution

###Font
The font used within this application is ["Creepsville"](http://www.fontfreak.com/font_Creepsville.htm), available for free.  An embedded font was chosen so that this font will still work in offline scenarios. The TTF font was converted for in-browser use with [Font Squirrel Generator](http://www.fontsquirrel.com/fontface/generator).

###Skull Icon
The "Skull" icon used by this application by [Tim Piper, from The Noun Project](http://thenounproject.com/noun/skull/#icon-No4522)

##Sounds

The audio assets are not redistributed in this directory due to copyright law.  However, all of these assets are available under Creative Commons licenses from [freesound.org](http://www.freesound.org).  Be sure to review the individual licenses for each file before any attempt to use them in any commercial or non-commercial work.  You can access specific download links in the [readme](https://github.com/triceam/Instant-Halloween/blob/master/www/assets/processed/README.md).

All sound files were converted to 16bit 22050 Hz MP3 files.  You can use a higher quality/bitrate if you want.  I chose the lower quality due to memory issues on older/low-end Android devices.

## License
THIS SOFTWARE IS PROVIDED BY ANDREW TRICE "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
EVENT SHALL ANDREW TRICE OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

