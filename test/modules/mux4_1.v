/* $Author: Giang Nguyen $ */
// CS/ECE 552
// 1/28/17

module mux4_1 (InA, InB, InC, InD, S, Out);

	input InA, InB, InC, InD;
	input [1:0] S;
	output Out;

	wire mux2_0_out, mux2_1_out;

	mux2_1 inst1(.InA(InA), .InB(InB), .S(S[0]), .Out(mux2_0_out));
	mux2_1 inst2(.InA(InC), .InB(InD), .S(S[0]), .Out(mux2_1_out));
	mux2_1 inst3(.InA(mux2_0_out), .InB(mux2_1_out), .S(S[1]), .Out(Out));

endmodule
