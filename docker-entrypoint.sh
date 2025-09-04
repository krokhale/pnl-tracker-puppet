#!/bin/sh
set -e

export DISPLAY=${DISPLAY:-:99}
SCREEN=${XVFB_SIZE:-1920x1080x24}
VNC_PORT=${VNC_PORT:-5900}
VNC_PASSWORD=${VNC_PASSWORD:-change-me}

# Start Xvfb (virtual display)
/usr/bin/Xvfb "$DISPLAY" -screen 0 "$SCREEN" -nolisten tcp &
sleep 0.5

# Setup VNC password
mkdir -p /root/.vnc
if [ ! -f /root/.vnc/passwd ]; then
  x11vnc -storepasswd "$VNC_PASSWORD" /root/.vnc/passwd
fi

# Start x11vnc attached to Xvfb  (NOTE: -localhost removed)
x11vnc -display "$DISPLAY" -rfbport "$VNC_PORT" \
  -rfbauth /root/.vnc/passwd -forever -shared \
  -nolookup -o /tmp/x11vnc.log &
sleep 0.2

# Diagnostics
echo "PWD: $(pwd)"
echo "Files in /usr/src/app:"; ls -la
echo "Files in dist:"; ls -la dist || true
echo "package.json start script:"; node -e "console.log(require('./package.json').scripts?.start)"

# Start app
exec npm run start
