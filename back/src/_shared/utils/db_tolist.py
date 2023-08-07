def db_tolist(model) -> list:
  return list(map(lambda x: [s.replace('\"', '') for s in x[1:-1].split(',')], [item for sublist in model for item in sublist]))