Instant-Halloween
=================

Instant Halloween is a free and open source Halloween-themed sound effects application built using PhoneGap.  This app was developed using PhoneGap version 3.0.0.  Please follow the PhoneGap 3.0 command line steps to reproduce this project.  This project uses native plugins supported by both Android and iOS - It CANNOT be used with PhoneGap build at the time of release.

## Setup Instructions:

1. Create a new phonegap project using the CLI command:  phonegap create InstantHalloween com.yourdomain.InstantHalloween InstantHalloween
2. Copy the contents of the www folder from this project into the newly created "www" folder
3. Add the following plugins from the CLI interface
	1. phonegap local plugin add https://github.com/triceam/LowLatencyAudio
	2. phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
	3. phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git
	4. honegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-splashscreen.git
	5. phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
	6. phonegap local plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git

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

