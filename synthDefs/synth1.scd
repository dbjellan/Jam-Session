(
SynthDef("synth1", {
	arg freq = 440, out = 0, mul = 1, revMix = 0.5, isWide = 1;
	var sig, env, gen;
	env = Env.adsr(0.5, 1, 0, 1, 1, 'lin');
	gen = EnvGen.kr(env, doneAction: 2);
	sig = BLowPass4.ar(
		Saw.ar([freq, (freq + (2 * isWide))], mul),
		2000 * gen,
		0.7
	);
	sig = FreeVerb.ar(
		sig,
		revMix
	);

	Out.ar(
		out,
		// sig
		sig * EnvGen.kr(Env.new, doneAction: 2)
	)
}).add;
)

x = Synth("synth1", [\out, 0, \mul, 0.2]);
x.free;
x.release;
