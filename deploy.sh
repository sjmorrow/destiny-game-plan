#!/bin/bash
set -ev
bundle exec rake:units
if [ "${TRAVIS_BRANCH}" = "develop" ]; then
	curl --ftp-create-dirs -T dist/* -u $FTP_USER:$FTP_PASSWORD ftp://ftp.dev.destinygameplan.com/home/destinygameplan/dgpdev
fi
