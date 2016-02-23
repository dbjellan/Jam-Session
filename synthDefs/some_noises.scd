s.boot
{SinOsc.ar(261.26, 0, 0.7)}.play;
(
SynthDef(\string, {arg out=0, freq=440, pan=0, sustain=0.5, amp=0.3;
	var pluck, period, string;
	pluck = PinkNoise.ar(Decay.kr(Impulse.kr(0.005), 0.05));
	period = freq.reciprocal;
	string = CombL.ar(pluck, period, period, sustain*6);
	string = LeakDC.ar(LPF.ar(Pan2.ar(string, pan), 12000)) * amp;
	DetectSilence.ar(string, doneAction:2);
	Out.ar(out, string)
}).add;
)

( SynthDef(\kickdrum, {
var osc, env, output;
osc = {SinOsc.ar(60)};
env = {Line.ar(1, 0, 1, doneAction: 2)};
output = osc * env;
Out.ar(0,
    Pan2.ar(output, 0)
)
}).add; )

Synth('kickdrum');

Synth(\string, [\freq, [60, 67, 64, 72, 58].choose.midicps, \sustain, rrand(1.0, 2.0)]);

