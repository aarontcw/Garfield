import mysql.connector
import mysql.connector.errors as error

from config import db_config
# test 8xnlPwi8zds1vIOg
class Database:

    connection = None
    cursor = None

    def __init__(self, table_name=None):
        # create table if not exist

        self.connection = mysql.connector.connect(**db_config)
        self.cursor = self.connection.cursor()
        self.table_name = table_name

    def read_rows(self, conditions):
        
        sql = "SELECT * FROM {} WHERE name={}".format(self.table_name, conditions)
        self._execute_sql(sql)
        query_result = self.cursor.fetchall()
        return query_result

    def test(self):
        self._execute_sql("SHOW DATABASES")
        query_result = self.cursor.fetchall()
        return query_result

    def _execute_sql(self, sql: str):
        """
        Executes a SQL query. This is a wrapper function used to handle exceptions.
        :param sql: The SQL string to be executed.
        :return: No return value if no error; raises a DatabaseError otherwise.
        """
        try:
            self.cursor.execute(sql)
        except (error.ProgrammingError, error.DatabaseError) as err:
            raise DatabaseError(err)