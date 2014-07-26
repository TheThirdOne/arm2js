registers = ['r0','r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15']
aliases   = ['a1','a2','a3','a4','v1','v2','v3','v4','v5','v6','sb' ,'sl' , 'fp','sp' ,'lr' , 'pc']

pattern = '<operation><cond><flags> Rd,Rn,Operand2'

operand2 = "value" | "<shift>" +  "value" | "register"