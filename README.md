# Hexdump to Command Converter for Kindle

This is a simple tool to convert hexdump output to a command that can be used to send to Kindle via SSH.
it should be copied straight like example below:

example hexdump input:
```sh
00000000  3a 2b bf 67 d6 7e 07 00  01 00 68 00 01 00 00 00  |:+.g.~....h.....|
00000010  3a 2b bf 67 d9 7e 07 00  00 00 00 00 00 00 00 00  |:+.g.~..........|
00000020  3a 2b bf 67 eb 66 09 00  01 00 68 00 00 00 00 00  |:+.g.f....h.....|
00000030  3a 2b bf 67 ed 66 09 00  00 00 00 00 00 00 00 00  |:+.g.f..........|
```

output like this:
```sh
printf "\x3a\x2b\xbf\x67\xd6\x7e\x07\x00\x01\x00\x68\x00\x01\x00\x00\x00" > /dev/input/event2
printf "\x3a\x2b\xbf\x67\xd9\x7e\x07\x00\x00\x00\x00\x00\x00\x00\x00\x00" > /dev/input/event2
printf "\x3a\x2b\xbf\x67\xeb\x66\x09\x00\x01\x00\x68\x00\x00\x00\x00\x00" > /dev/input/event2
printf "\x3a\x2b\xbf\x67\xed\x66\x09\x00\x00\x00\x00\x00\x00\x00\x00\x00" > /dev/input/event2
```

or
```sh
echo -ne "\x3a\x2b\xbf\x67\xd6\x7e\x07\x00\x01\x00\x68\x00\x01\x00\x00\x00" | dd of=/dev/input/event2 bs=16
echo -ne "\x3a\x2b\xbf\x67\xd9\x7e\x07\x00\x00\x00\x00\x00\x00\x00\x00\x00" | dd of=/dev/input/event2 bs=16
echo -ne "\x3a\x2b\xbf\x67\xeb\x66\x09\x00\x01\x00\x68\x00\x00\x00\x00\x00" | dd of=/dev/input/event2 bs=16
echo -ne "\x3a\x2b\xbf\x67\xed\x66\x09\x00\x00\x00\x00\x00\x00\x00\x00\x00" | dd of=/dev/input/event2 bs=16
```