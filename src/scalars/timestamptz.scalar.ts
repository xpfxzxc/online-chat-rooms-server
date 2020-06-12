import { ValueNode, Kind, GraphQLScalarType } from 'graphql';

export const TimestamptzScalar = new GraphQLScalarType({
  description: 'timestamptz custom scalar type',
  name: 'timestamptz',

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },

  parseValue(value: string) {
    return value;
  },

  serialize(value: string) {
    return value;
  },
});
