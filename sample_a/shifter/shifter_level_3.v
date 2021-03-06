module shifter_level_3 (In, S, Op, Out);
   
   input [15:0] In;
   input S;
   input [1:0]  Op;
   output [15:0] Out;
   


   wire [7:0] x_out;


  shifter_lsb_msb x[7:0](Op[0], In[15:8], x_out);

  mux4_1 m[15:0](In, {In[7:0], x_out[7:0]}, In, {x_out[7], x_out[7], x_out[7], x_out[7], x_out[7], x_out[7], x_out[7], x_out[7], In[15:8]}, {Op[1], S}, Out);
   

  /*
   wire x0_out,
        x1_out,
        x2_out,
        x3_out,
        x4_out,
        x5_out,
        x6_out,
        x7_out;

   
   shifter_lsb_msb x0(Op[0], In[15], x0_out);
   shifter_lsb_msb x1(Op[0], In[14], x1_out);
   shifter_lsb_msb x2(Op[0], In[13], x2_out);
   shifter_lsb_msb x3(Op[0], In[12], x3_out);
   shifter_lsb_msb x4(Op[0], In[11], x4_out);
   shifter_lsb_msb x5(Op[0], In[10], x5_out);
   shifter_lsb_msb x6(Op[0], In[9] , x6_out);
   shifter_lsb_msb x7(Op[0], In[8] , x7_out);

   mux4_1    m0  (In[0] , x7_out, In[0] , In[8] , {Op[1], S}, Out[0]);
   mux4_1    m1  (In[1] , x6_out, In[1] , In[9] , {Op[1], S}, Out[1]);
   mux4_1    m2  (In[2] , x5_out, In[2] , In[10], {Op[1], S}, Out[2]);
   mux4_1    m3  (In[3] , x4_out, In[3] , In[11], {Op[1], S}, Out[3]);
   mux4_1    m4  (In[4] , x3_out, In[4] , In[12], {Op[1], S}, Out[4]);
   mux4_1    m5  (In[5] , x2_out, In[5] , In[13], {Op[1], S}, Out[5]);
   mux4_1    m6  (In[6] , x1_out, In[6] , In[14], {Op[1], S}, Out[6]);
   mux4_1    m7  (In[7] , x0_out, In[7] , In[15], {Op[1], S}, Out[7]);
   
   mux4_1    m8  (In[8] , In[0] , In[8] , x0_out, {Op[1], S}, Out[8]);
   mux4_1    m9  (In[9] , In[1] , In[9] , x0_out, {Op[1], S}, Out[9]);
   mux4_1    m10 (In[10], In[2] , In[10], x0_out, {Op[1], S}, Out[10]);
   mux4_1    m11 (In[11], In[3] , In[11], x0_out, {Op[1], S}, Out[11]);
   mux4_1    m12 (In[12], In[4] , In[12], x0_out, {Op[1], S}, Out[12]);
   mux4_1    m13 (In[13], In[5] , In[13], x0_out, {Op[1], S}, Out[13]);
   mux4_1    m14 (In[14], In[6] , In[14], x0_out, {Op[1], S}, Out[14]);
   mux4_1    m15 (In[15], In[7] , In[15], x0_out, {Op[1], S}, Out[15]);
  */
endmodule
