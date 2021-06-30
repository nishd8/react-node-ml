import joblib
import numpy as np
import sys
arr = sys.argv[1].split(',')
model = sys.argv[2]
loaded_model = joblib.load(model)
#array = [5,3,1,0,35,0,0,8,1,0,0] 
a = np.asarray(arr).reshape(1,-1)
predicted_value= loaded_model.predict(a)
print(predicted_value[0])
#4,1,0,1,35,1,0,53.1,1,0,0